import React from "react"

function Flippin(props){
    if(props.op=="2"){
return(
    <div>
    <button onClick={props.hor}>Horizontally</button>
    <button onClick={props.ver}>Vertically</button>
    </div>
)
    }

    else{
        return (<div></div>)
    }
}
export default Flippin