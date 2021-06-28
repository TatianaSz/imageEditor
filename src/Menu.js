import React, {useState} from "react"
import "./css/menu.css"
import { BsCardImage } from 'react-icons/bs';
import {HiOutlineAdjustments} from 'react-icons/hi'
import {IoResize} from 'react-icons/io5'
import {IoText} from "react-icons/io5"
import {IoShapesOutline} from "react-icons/io5"


function Menu(props){
    const [zero, setZero] = useState("clicked");
    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    
    
    return (
        <div className="menu">
            <ul ref={props.menuRef}>
                <li  className={zero} onClick={()=>{setZero("clicked"); setOne(""); setTwo(""); setThree("") ;setFour("")}}><BsCardImage /> </li>
                <li  className={one}  onClick={()=>{setZero(""); setOne("clicked"); setTwo(""); setThree("") ;setFour("")}} ><HiOutlineAdjustments/></li>
                <li className={two}  onClick={()=>{setZero(""); setOne(""); setTwo("clicked"); setThree("") ;setFour("")}}><IoResize /></li>
                <li className={three} onClick={()=>{setZero(""); setOne(""); setTwo(""); setThree("clicked") ;setFour("")}}><IoText /></li>
                <li className={four} onClick={()=>{setZero(""); setOne(""); setTwo(""); setThree("") ;setFour("clicked")}}><IoShapesOutline /></li>
            </ul>



        </div>
    )
}

export default Menu