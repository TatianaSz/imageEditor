import React from "react"
import {BsFilePlus} from "react-icons/bs"

function Uploader(props){
return(

<label className="uploader">
     <div className="centered">
     Add image <br/>
     <BsFilePlus className="uploadIcon"/>
     </div>
     <input  type="file" onChange={props.onChange}/>
     </label>
)
}

export default Uploader