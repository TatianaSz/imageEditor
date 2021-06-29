import React from "react"
import './css/delete.css'
import {RiDeleteBack2Line} from "react-icons/ri"

function Delete(props){
if(props.op=="0"){
return(
    <div className='deleter-container'>
    <button className="deleter" onClick={props.onClick}>Delete Image <br/>
    <div className="deleter-icon"><RiDeleteBack2Line/></div>
    </button>
    </div>
)
}
else {
    return(<div></div>)
}
}

export default Delete