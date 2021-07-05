import React from 'react'

function Shapes(props){
if(props.op=="4"){
    return(
        <button onClick={props.onClick}>
                coś do klikniecia
        </button>
    )
}
else{
    return (
        <div></div>
    )
}
}

export default Shapes