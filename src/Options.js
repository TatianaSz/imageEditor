import React from "react";
import "./css/options.css"
import {BsFilePlus} from "react-icons/bs"

function Options(props){
    return (
        <div className="options" >
        <label className="uploader">
            <div className="centered">
                Add image <br/>
                <BsFilePlus className="uploadIcon"/>
            </div>
        <input  type="file" onChange={props.onChange}/>
        </label>
        
        </div>
    )
}

export default Options