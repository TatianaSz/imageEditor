import React, {useState} from "react"
import "./css/menu.css"
import { BsCardImage } from 'react-icons/bs';
import {HiOutlineAdjustments} from 'react-icons/hi'
import {IoResize} from 'react-icons/io5'
import {IoText} from "react-icons/io5"
import {IoShapesOutline} from "react-icons/io5"


function Menu(props){
    return (
        <div className="menu">
            <ul ref={props.menuRef}>
                <li  className="clicked"><div data-value="0" onClick={props.onClick} className="transparent"></div><BsCardImage /> </li>
                <li  className=""><div data-value="1" onClick={props.onClick}  className="transparent"></div><HiOutlineAdjustments/></li>
                <li className=""><div data-value="2" onClick={props.onClick} className="transparent"></div><IoResize /></li>
                <li className=""><div data-value="3" onClick={props.onClick} className="transparent"></div><IoText /></li>
                <li className=""><div data-value="4" onClick={props.onClick} className="transparent"></div><IoShapesOutline /></li>
            </ul>
        </div>
    )
}

export default Menu