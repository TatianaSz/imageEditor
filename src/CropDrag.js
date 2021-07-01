import React from "react"
import Draggable from "react-draggable";
import './css/drag.css'

function CropDrag(){
return(
  
 <Draggable bounds="parent">
            <div className="drag"></div>
</Draggable>

  
)

}

export default CropDrag