import { use, useState } from "react";
import mediaUpload from "../utils/mediaUpload";


export default function Testing() {

const[file,setFile]=useState(null)

    function  uploadFile(){
        console.log(file)
       
        mediaUpload(file).then((url)=>{
            console.log(url)
    } )}


    return (
        <div className="h-screen w-full ">
            <h1>Testing Page</h1>
            <input type="file" onChange={(e) => {setFile(e.target.files[0])}}/>
            <button onClick={uploadFile} > Submit</button>
        </div>
    );

}