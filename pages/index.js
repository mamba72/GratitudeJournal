import Head from 'next/head'
import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import GratitudeApp from '../components/GratitudeApp'

// fetch data function example
const fetchDataFromSupabase = async () => {
    let { data, error } = await supabase
        .from('TABLE_NAME')
        .select('COLUMN, ANOTHER_COLUMN')
    if (error) setError(error.message)
    else {
        setData(data)
        setLoading(false)
    }
  }

  
export default function Home() {

  //gets teh logged in user from Auth.UserContextProvider (the parent object in the _app.js file)
  //if no user is logged in, user will be Null
  const { user } = Auth.useUser()


  return (
    //she did bg-gray-700 min-h-screen min-w-screen
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Gratitude Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center max-w-7xl">
        
        {/* if(user != null) display GratitudeApp; else display auth; */}
        { user ? ( <div>
            <GratitudeApp user={user}/>

            <button className="text-pink-300" onClick={ async () => { 
              let { error } = await supabase.auth.signOut()
              if(error) { console.log(error)}
              }
            }>
              Logout
            </button>
          </div>
        ) : (
          
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
          
        )

        }
      </main>

      {/* How to make css in javascript. Just start writing css in the following string */}
      <style jsx>{`

        .spacer {
          height: 15px;
        }
        `}</style>

      <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
        {/* <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        > */}
        {/* <div className="flex flex-col items-center"> */}
          <p>Written by Stephen White</p>

          <p>Inspired by <a href="https://gratijournal.netlify.app/"><b>this</b></a> gratitude journal example</p>
        {/* </div> */}
          {/* {' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
        {/* </a> */}
      </footer>
    </div>
  )
}
