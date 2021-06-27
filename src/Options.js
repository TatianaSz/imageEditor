import React, { useState } from 'react';
import "./css/options.css"
import {BsFilePlus} from "react-icons/bs"
import Slider from "./Slider"

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
        <Slider value={props.value}  onChange={props.slide} onClickLeft={props.onClickLeft}  onClickRight={props.onClickRight} 
                value2={props.value2} onClickLeft2={props.onClickLeft2}  onClickRight2={props.onClickRight2}/>
        </div>
    )
}

export default Options