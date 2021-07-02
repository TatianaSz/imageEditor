import React, {useRef} from "react"
import Draggable from "react-draggable";
import './css/drag.css'

function CropDrag(props){
const red = useRef(null)

    function Resize(e) {
        let first=e.target.parentNode.firstChild
      // console.log(e.target.parentNode.firstChild)
     first.style.width =200 + "px"
     //  e.target.style.width = (e.target.clientX -  e.target.offsetLeft) + 'px';
      // e.target.style.height = (e.target.clientY -  e.target.offsetTop) + 'px';
      
      }
return(
    <div className="test">
        <Draggable>
            <div>
                <Draggable  bounds=".image-max"><div ref={red} className="aaaa"></div></Draggable>
                <Draggable onDrag={Resize}  bounds=".aaaa" ><div className="hand q"></div></Draggable>
                <Draggable onDrag={Resize} bounds=".aaaa"><div className="hand w"></div></Draggable>
                <Draggable onDrag={Resize} bounds=".aaaa"><div className="hand e"></div></Draggable>
                <Draggable  onDrag={Resize}  bounds=".aaaa"><div className="hand r"></div></Draggable>
            </div>
        </Draggable>
    </div>
  
)

}

export default CropDrag