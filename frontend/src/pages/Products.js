import React, { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import Card from '../components/Card';

export default function Products() {
   const data = useRouteLoaderData('root').products.products;
   const [products, setProducts] = useState(data);
   const [isSorted, setIsSorted] = useState(false);

   function sortData() {
      if (!isSorted) {
         setProducts([...data].sort((a, b) => a.cost - b.cost));
         setIsSorted(true);
      } else {
         setProducts([...data].sort((a, b) => b.cost - a.cost));
         setIsSorted(false);
      }
   }

   return (
      <div>
         <div style={{ marginBottom: '2rem' }}>
            <button onClick={sortData}>Sort</button>
         </div>
         <div className="cards">
            {products.map((product) => (
               <Link key={product.id} to={product.id}>
                  <Card product={product} />
               </Link>
            ))}
         </div>
      </div>
   );
}
