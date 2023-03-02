import { redirect } from 'react-router-dom';

export function getAuthToken() {
   const token = localStorage.getItem('token');
   return token;
}

export function getEmail() {
   const email = localStorage.getItem('email');
   return email;
}

export function tokenLoader() {
   return getAuthToken();
}

export function checkAuthLoader() {
   const token = getAuthToken();

   if (!token) {
      return redirect('/auth?mode=login');
   }

   return null;
}
