import React from 'react';
import { Outlet, json, defer } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { tokenLoader } from '../util/auth';
import { CartContextProvider } from '../context/cart-context';

export default function RootLayout() {
   return (
      <main>
         <CartContextProvider>
            <MainNav />
         </CartContextProvider>
         <Outlet />
      </main>
   );
}

async function productsLoader() {
   const res = await fetch('http://localhost:5050/products');

   if (!res.ok) {
      throw json(
         {
            title: 'Unable to Fetch Products',
            message:
               'Oops! Something went wrong while trying to fetch the products!',
         },
         { status: 500 }
      );
   }

   return res.json();
}

export async function loader() {
   const products = await productsLoader();
   const token = tokenLoader();
   return defer({ products, token });
}
