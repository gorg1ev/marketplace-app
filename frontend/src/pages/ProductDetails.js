import React from 'react';
import { json, useRouteLoaderData, redirect } from 'react-router-dom';
import CardDetail from '../components/CardDetail';
import { getAuthToken, getEmail } from '../util/auth';
import { CartContextProvider } from '../context/cart-context';

export default function ProductDetails() {
   const product = useRouteLoaderData('product').product;

   return (
      <div>
         <CartContextProvider>
            <CardDetail product={product} />
         </CartContextProvider>
      </div>
   );
}

export async function loader({ params }) {
   const res = await fetch(
      'http://localhost:5050/products/' + params.productId
   );

   if (!res.ok) {
      throw json(
         {
            title: 'Unable to Fetch Product',
            message:
               'Oops! Something went wrong while trying to fetch the product!',
         },
         { status: 500 }
      );
   }

   return res;
}

export async function action({ params, request }) {
   const data = await request.formData();
   const value = data.get('intent');
   let productId = params.productId;
   let comment = '';
   const token = getAuthToken();
   let bodyData = {};

   if (value === 'comment') {
      comment = '/comments';
      bodyData = {
         email: getEmail(),
         text: data.get('text'),
      };
   }

   const res = await fetch(
      'http://localhost:5050/products/' + productId + comment,
      {
         method: request.method,
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify(bodyData),
      }
   );

   if (!res.ok) {
      throw json(
         { message: 'Could not delete event.' },
         {
            status: 500,
         }
      );
   }

   if (value === 'comment') {
      return redirect('/products/' + productId);
   } else {
      return redirect('/products');
   }
}
