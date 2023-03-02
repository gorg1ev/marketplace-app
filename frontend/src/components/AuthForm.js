import {
   Form,
   Link,
   useSearchParams,
   useActionData,
   useNavigation,
} from 'react-router-dom';

import styles from './AuthForm.module.css';

export default function AuthForm() {
   const data = useActionData();
   const navigation = useNavigation();

   const [searchParams] = useSearchParams();
   const isLogin = searchParams.get('mode') === 'login';
   const isSubmitting = navigation.state === 'submitting';

   return (
      <Form method="post" className={styles.form}>
         <h1>{isLogin ? 'Log In' : 'Sign In'}</h1>
         {data && data.errors && (
            <ul>
               {Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
               ))}
            </ul>
         )}
         {data && data.message && <p>{data.message}</p>}
         <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
         </div>
         <div>
            <label htmlFor="image">Password</label>
            <input id="password" type="password" name="password" required />
         </div>
         <div>
            <button disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
               {isLogin ? 'Sign in' : 'Log in'}
            </Link>
         </div>
      </Form>
   );
}
