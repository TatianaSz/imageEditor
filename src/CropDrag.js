import React  from "react"
import Draggable from "react-draggable";
import './css/drag.css'

function CropDrag(props){

    function Resize(e) {
        let w = document.getElementById("iddd")
         w.style.width = (e.clientX -  w.getBoundingClientRect().left) + 'px';
        w.style.height = (e.clientY -  w.getBoundingClientRect().top) + 'px';
      }
    
return(
    <div id="idd" className="test">
                <div  id="iddd" className="aaaa"></div>
                <Draggable  bounds=".test" onDrag={Resize} onMouseMove={Resize} ><div className="hand r"></div></Draggable>
                
       
    </div>
  
)

}

export default CropDrag