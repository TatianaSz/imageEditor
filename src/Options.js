import React from "react";
import "./css/options.css"

function Options(props){
    return (
        <div className="options" >
 <input type="file" onChange={props.onChange}/>
       

        </div>
    )
}

export default Options