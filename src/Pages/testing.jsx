import { use, useState } from "react";




export default function Testing() {
const[file,setFile]=useState(null)


    return (
        <div className="h-screen w-full bg-gray-400">
            <h1>Testing Page</h1>
            <input type="file" onChange={(e) => {console.log(e.target.files)}}/>
            <button > Submit</button>
        </div>
    );
}