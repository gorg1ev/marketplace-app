import { useRouteLoaderData } from 'react-router-dom';

import ProductForm from '../components/ProductForm';

function EditProduct() {
   const data = useRouteLoaderData('product');

   return <ProductForm method="patch" product={data.product} />;
}

export default EditProduct;
