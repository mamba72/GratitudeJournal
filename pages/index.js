import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import { useState } from 'react'

export default function Home() {

  //this is our state object.
  //basics of this datatype is const [user, setUser] = useState({})
  //left side is an array and right side is an array.
  //user is the actual data value, setUser is the updater function. both are returned from useState function
  //whatever is the argument of the useState function is the default value of user
  const [user,setUser] = useState(
    {
    "name": "Stephen",
    "email":"stwhite@chapman.edu"
  })
  //can hardcode variables here
  //const for constants
  //let for variables
  // const user = {
  //   "name": "Stephen",
  //   "email":"stwhite@chapman.edu"
  // }

  const [gratitudes,setGratitudes] = useState(['my family','pasta','the sun','my dogs'])
  //let gratitudes = ['my family','pasta','the sun','my dogs']

  //let hasSubmittedToday = true
  const [hasSubmittedToday,setHasSubmittedToday] = useState(false)

  //create new function to add to the gratitudes array
  const addGratitude = (entry) => {
    //the ... deconstructs the array and splits the elements out rather than making a 2D array
    let newGratitudes = [...gratitudes, entry]
    setGratitudes(newGratitudes)
    setHasSubmittedToday(true)
  }


  return (
    //she did bg-gray-700 min-h-screen min-w-screen
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Gratitude Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
