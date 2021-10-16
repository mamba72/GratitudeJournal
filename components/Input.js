import { useState } from 'react'
export default function Input({ handleSubmit }) {

    const [value,setValue] = useState("")

    //create an onsubmit function
    let submitForm = e => {
        e.preventDefault()
        handleSubmit(value)
        setValue("")
    }

    return (
        <form onSubmit={submitForm}>
            <input placeholder="Enter Gratitude" type="text" value={value} 
                //e.target.value is the value given to the onChange event and it is the text the user changed in the textbox
                onChange={e => setValue(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">

                </input>
            <button type="submit" className="bg-pink-300 rounded px-12 py-2 drop-shadow">Save</button>
        </form>
        
    )
}