import React from "react"

function Flippin(props){
    if(props.op=="2"){
return(
    <div>
    <button onClick={props.onClick}>placeholder</button>
    <button>second</button>
    </div>
)
    }

    else{
        return (<div></div>)
    }
}
export default Flippin