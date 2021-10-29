//_app.js allows us to have global-style variables 


import { Auth } from '@supabase/ui'
import { supabase } from '../utils/supabaseClient'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    //this allows all children of this context provider to access the User. 
    //Essentially making User a global variable
    //can sorta think about it like a namespace or a parent class
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  
    )
}

export default MyApp
