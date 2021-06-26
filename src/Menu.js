import React from "react"
import "./css/menu.css"
import { BsCardImage } from 'react-icons/bs';
import {HiOutlineAdjustments} from 'react-icons/hi'
import {IoResize} from 'react-icons/io5'
import {IoText} from "react-icons/io5"
import {IoShapesOutline} from "react-icons/io5"

function Menu(props){
    return (
        <div className="menu">
            <ul>
                <li className={props.clicked}><BsCardImage /> </li>
                <li><HiOutlineAdjustments /></li>
                <li><IoResize /></li>
                <li><IoText /></li>
                <li><IoShapesOutline /></li>
            </ul>



        </div>
    )
}

export default Menu