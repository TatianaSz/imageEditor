import React, { useState } from 'react';
import "./css/options.css"

function Options(props){
    return (
        <div  className="options" >
            <div  className="generic">
        {props.children}
        </div>
        </div>
    )
}

export default Options
//style={{display:"none"}}