import React from 'react'
import './css/font.css'

function ChooseFont(props){
    if(props.op==props.generic){
        return(
            <div className={`font--option ${props.chosen}`} data-fonts={props.chosen} onClick={props.onClick}>{props.text}</div>
        )
        }
    else{
        return <div></div>
    }
}
export default ChooseFont