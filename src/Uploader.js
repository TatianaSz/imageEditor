import React from "react"
import {BsFilePlus} from "react-icons/bs"

function Uploader(props){
    if(props.op=="0"){
          return(
               <label  className="uploader">
               <div className="centered"> Add image <br/>
                    <BsFilePlus className="uploadIcon"/>
               </div>
               <input  type="file" onChange={props.onChange}/></label>
          )
    }
    else{
     return <div></div>
    }
}

export default Uploader