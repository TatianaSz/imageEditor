import React from 'react'
import './css/font.css'

function FontContainer(props){
    if(props.op==props.generic){
        return(
            <div className="font--container" >
                {props.children}
            </div>
        )
        }
    else{
        return <div></div>
    }
}
export default FontContainer