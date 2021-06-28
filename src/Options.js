import React, { useState } from 'react';
import "./css/options.css"
import {BsFilePlus} from "react-icons/bs"
import Slider from "./Slider"

function Options(props){
    return (
        <div className="options" >
        {props.children}
        </div>
    )
}

export default Options