import React from 'react';
import { useRouteLoaderData, Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Home() {
   const data = useRouteLoaderData('root').products.products;

   const products = data.sort((a, b) => a.rating < b.rating).slice(0, 3);

   return (
      <div>
         <h1>Welcomme to the Grocery Store</h1>
         <div className="cards">
            {products.map((product) => (
               <Link to={`products/${product.id}`} key={product.id}>
                  <Card product={product} />
               </Link>
            ))}
         </div>
      </div>
   );
}
