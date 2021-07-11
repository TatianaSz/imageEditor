import React from "react"
import './css/shapes.css'

function Inpute(props){
    if(props.op =="3"){
     return(
        <div className="input--container">
            <label className="input--label"> {props.inputLabel}
            <div className={props.type}>
            <input type={props.type} onChange={props.onChange}/>
            </div>
            </label>
        </div>
    )
    }
    else{
        return (null)
    }
}

export default Inpute