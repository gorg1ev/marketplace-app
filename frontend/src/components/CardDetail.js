import React, { useContext } from 'react';
import { Link, useRouteLoaderData, useSubmit, Form } from 'react-router-dom';
import styles from './CardDetail.module.css';
import Stars from './Stars';
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';
import CartContext from '../context/cart-context';
import Plane from './Plane';

export default function CardDetail({ product }) {
   const productsComments = product.comments.length;
   const token = useRouteLoaderData('root').token;
   const submit = useSubmit();
   const data = useContext(CartContext);

   function deletProduct() {
      const proceed = window.confirm('Are you sure?');

      if (proceed) {
         submit(null, { method: 'delete' });
      }
   }

   return (
      <div className={styles.product}>
         <div className={styles.img}>
            <img src={product.image} alt={product.title} />
         </div>
         <div className={styles.details}>
            <div className={styles.header}>
               <h1>{product.title}</h1>
               <h1>{product.cost}$</h1>
            </div>
            <div className={styles.description}>
               <div className={styles.header}>
                  <h3>Description</h3>
                  {token && (
                     <div>
                        <Link to="edit">
                           <button>
                              <EditIcon />
                           </button>
                        </Link>
                        <button onClick={deletProduct}>
                           <DeleteIcon />
                        </button>
                     </div>
                  )}
               </div>
               <p>
                  {product.description} <br /> {product.date}
               </p>
            </div>
            {token && (
               <div
                  className={styles.cta}
                  onClick={data.addToCart.bind(null, product)}
               >
                  <button>Add to cart</button>
               </div>
            )}
            <div className={styles.reviews}>
               <h3>Product Reviews ({productsComments})</h3>
               <div>
                  <Stars length={product.rating} />
               </div>
            </div>
            {product.comments.map((comm, i) => {
               return (
                  <div key={i + product.id} className={styles.comments}>
                     <h3>{comm.email}</h3>
                     <small>└ {comm.text}</small>
                  </div>
               );
            })}
            {token && (
               <Form method="post" className={styles.form}>
                  <input placeholder="Add a comment" name="text" required />
                  <button name="intent" value="comment">
                     <Plane />
                  </button>
               </Form>
            )}
         </div>
      </div>
   );
}
