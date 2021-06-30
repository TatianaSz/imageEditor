import React from 'react';
import "./css/options.css"

function Options(props){
    return (
        <div  className="options" >
        {props.children}
        </div>
    )
}

export default Options
