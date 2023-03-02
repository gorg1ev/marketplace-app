import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function Error() {
   const error = useRouteError();

   return (
      <div>
         <h1>{error.data.title}</h1>
         <p>{error.data.message}</p>
      </div>
   );
}
