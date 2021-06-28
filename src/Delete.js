import React from "react"
import './css/delete.css'
import {RiDeleteBack2Line} from "react-icons/ri"

function Delete(props){

return(
    <div className='deleter-container'>
    <button className="deleter" onClick={props.onClick}>Delete Image <br/>
    <div className="deleter-icon"><RiDeleteBack2Line/></div>
    </button>
    </div>
)

}

export default Delete