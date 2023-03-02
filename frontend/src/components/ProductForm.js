import {
   Form,
   useNavigate,
   useNavigation,
   useActionData,
   json,
   redirect,
} from 'react-router-dom';
import classes from './ProductForm.module.css';
import { getAuthToken } from '../util/auth';

let oldData;

function ProductForm({ method, product }) {
   const data = useActionData();
   const navigate = useNavigate();
   const navigation = useNavigation();
   oldData = product || {
      comments: [],
   };

   const isSubmitting = navigation.state === 'submitting';

   function cancelHandler() {
      navigate('..');
   }

   return (
      <Form method={method} className={classes.form}>
         {data && data.errors && (
            <ul>
               {Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
               ))}
            </ul>
         )}
         <div>
            <label htmlFor="title">Title</label>
            <input
               id="title"
               type="text"
               name="title"
               required
               defaultValue={product ? product.title : ''}
            />
         </div>
         <div>
            <label htmlFor="image">Image</label>
            <input
               id="image"
               type="url"
               name="image"
               required
               defaultValue={product ? product.image : ''}
            />
         </div>
         <div>
            <label htmlFor="cost">Cost</label>
            <input
               id="cost"
               type="number"
               name="cost"
               required
               defaultValue={product ? product.cost : ''}
            />
         </div>
         <div>
            <label htmlFor="description">Description</label>
            <textarea
               id="description"
               name="description"
               rows="5"
               required
               defaultValue={product ? product.description : ''}
            />
         </div>
         <div>
            <label htmlFor="date">Date</label>
            <input
               id="date"
               type="date"
               name="date"
               required
               defaultValue={product ? product.date : ''}
            />
         </div>
         <div>
            <label htmlFor="rating">Rateing</label>
            <input
               id="rating"
               type="number"
               name="rating"
               required
               max="5"
               min="1"
               defaultValue={product ? product.rating : ''}
            />
         </div>
         <div className={classes.actions}>
            <button
               type="button"
               onClick={cancelHandler}
               disabled={isSubmitting}
            >
               Cancel
            </button>
            <button disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
         </div>
      </Form>
   );
}

export default ProductForm;

export async function action({ request, params }) {
   const method = request.method;
   const data = await request.formData();

   const productData = {
      ...oldData,
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      cost: data.get('cost'),
      rating: data.get('rating'),
      description: data.get('description'),
   };

   let url = 'http://localhost:5050/products/';

   if (method === 'PATCH') {
      const productId = params.productId;
      url += productId;
   }

   const token = getAuthToken();
   const response = await fetch(url, {
      method: method,
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(productData),
   });

   if (response.status === 422) {
      return response;
   }

   if (!response.ok) {
      throw json({ message: 'Could not save event.' }, { status: 500 });
   }

   return redirect('/products');
}
