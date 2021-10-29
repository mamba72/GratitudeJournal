import Greeting from './Greeting'
import History from './History'
import Input from './Input'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabaseClient'


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

  
export default function GratitudeApp({ user }) {

  //this is our state object.
  //basics of this datatype is const [user, setUser] = useState({})
  //left side is an array and right side is an array.
  //user is the actual data value, setUser is the updater function. both are returned from useState function
  //whatever is the argument of the useState function is the default value of user
//   const [user,setUser] = useState(
//     {
//     "name": "Stephen",
//     "email":"stwhite@chapman.edu"
//   })
  //can hardcode variables here
  //const for constants
  //let for variables
  // const user = {
  //   "name": "Stephen",
  //   "email":"stwhite@chapman.edu"
  // }

  const [gratitudes,setGratitudes] = useState([])
  //let gratitudes = ['my family','pasta','the sun','my dogs']

  //let hasSubmittedToday = true
  const [hasSubmittedToday,setHasSubmittedToday] = useState(false)

  //this is for doing the loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //creating a new clientSide function that gets the gratitudes from SupaBase
  //useEffect() allows us to perform a task after the site initially renders
  useEffect(() => {
    //runing the function we are defining below
    fetchGratitudes()
  }, [])

  //getting the gratitudes from supabase and populate the gratitude array
  const fetchGratitudes = async () => {
      
    let { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('entry, date_insert_ts')
    .eq('id', user.id)

    setLoading(true);
    //if there is no error...
    if(!error) {
      /* */
      setGratitudes(gratitudes)

      
      let mostRecentRecord = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
      let currentTime = new Date().getTime()
      let hoursSinceLastSubmission = (mostRecentRecord / currentTime) / 3600000

      //check if they have submitted within the last 24 hours
      if(Math.abs(hoursSinceLastSubmission) < 24)
      {
        setHasSubmittedToday(true)
      }
      else{
        setHasSubmittedToday(false)
      }
      

      
      setLoading(false);

      
    }
    else //if there is an error, then print it
    {
      console.log(error)
      setError(error);
    }
    
  }

  console.log(gratitudes)
  //create new function to add to the gratitudes array
  const addGratitude = async (entry) => {
    //the ... deconstructs the array and splits the elements out rather than making a 2D array
    // let newGratitudes = [...gratitudes, entry]
    // setGratitudes(newGratitudes)
    // setHasSubmittedToday(true)

    //writing new one to interact with Supabase...
    
    const { data, error } = await supabase
    .from('gratitudes')
    .insert([
      { id: user.id, entry: entry },
    ])

    setLoading(true);    

    if(!error)
    {
      //no error happened. good to go

      //just updating the onscreen gratitudes with the new one
      setGratitudes([...gratitudes, {'entry':entry, 'date_insert_ts':null}])
      setLoading(false);
      //setHasSubmittedToday(true);

    }else {
      //error happened
      console.log(error);
      setLoading(false);
      setError(error);
    }


    if(loading) 
    {
      return <p>Loading...</p>
    }

    if(error)
    {
      return <p>{error}</p>
    }

  }


  

  

  return (
    //she did bg-gray-700 min-h-screen min-w-screen
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center max-w-7xl">
        {/* <h1 className="text-6xl font-bold">
          Hello World!
          
        </h1> */}

          {/* we just use the component like an html tag and then put in the value with the given name for the prop */}
        <Greeting user={user} gratitudes={gratitudes} hasSubmittedToday={hasSubmittedToday}></Greeting>
        
        <div className='spacer'/>
        {
          //only display the input section if they have not submitted today
          !hasSubmittedToday &&
          <Input handleSubmit={addGratitude}></Input>
        }
        
        <div className='spacer'/>
        <History gratitudes={gratitudes}></History>
        
        
        
      </main>

      {/* How to make css in javascript. Just start writing css in the following string */}
      <style jsx>{`

        .spacer {
          height: 15px;
        }
        `}</style>

      {/* <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
        {/* <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        > */}
        {/* <div className="flex flex-col items-center"> */}
          {/* <p>Written by Stephen White</p>

          <p>Inspired by <a href="https://gratijournal.netlify.app/"><b>this</b></a> gratitude journal example</p> */}
        {/* </div> */}
          {/* {' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
        {/* </a> */}
      {/*</footer> */}

    </div>
  )
}
