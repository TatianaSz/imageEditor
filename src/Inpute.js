import React from "react"
import { BsPersonPlus } from "react-icons/bs"

function Inpute(props){
    if(props.op =="3"){
     return(
        <div>
            <input type={props.type} onChange={props.onChange}/>
        </div>
    )
    }
    else{
        return <div></div>
    }
}

export default Inpute