//Greeting is the name of the component
export default function Greeting({user, gratitudes,hasSubmittedToday}) {
    return (
        //the return function can only return one html element, so just put it all in a big div.
        
        <div className="text-2xl">
            {/* brackets are used to say that what is inside is code
            <h1 className="text-white text-6xl">Hey, {user.email}!</h1> */}
            <h1 className="text-4xl">
                Hey, <span className="text-pink-500 drop-shadow">{user.email}</span>!
            </h1>
            
            {/* Conditional rendering */}
            {
                //the && is shorthand for "if true, render the following..."
                //the question mark is "if true, render this... otherwise render after the colon"
                hasSubmittedToday ? (
                    //slice function slices the array at the given index. so essentially slice(-1) gets 
                    //an array of the last value in the given array.
                    <h2>Today you're grateful for {gratitudes.slice(-1)[0]}.</h2>
                ) : (
                    <h2>What are you grateful for today?</h2>
                )
            }
        </div>
        
    )
}


//InputForm is the name of the component
// export default function InputForm(props) {
//     return (
//         //the return function can only return one html element, so just put it all in a big div.

//         //we are assuming props has a value called "name" in it.
//         //brackets are used to say that what is inside is code
//         <h1 className="text-4xl">Hello, {props.name}!</h1>
//     )
// }