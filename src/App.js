import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import Uploader from './Uploader'
import Delete from './Delete'
import Slider from './Slider'
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";


function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null)
  
  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [menus, setMenus] = useState("0")
  let a;

  function addFile(e){
  URL.revokeObjectURL(file)
   setFile(
    URL.createObjectURL(e.target.files[0])
    )
  }
  useEffect(() => {   
    const canvas = canva.current;
    const ctx = canvas.getContext("2d")
    const img = image.current;
    img.onload=()=>{
     var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
     var x = (canvas.width / 2) - (img.width / 2) * scale;
     var y = (canvas.height / 2) - (img.height / 2) * scale;
     ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
 });
 
 function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h, s, l];
}
function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



  function setBrightness(){
    const canvas = canva.current;
    const img = image.current;
    
    if(img.width){ //checks if image is even there in case someone tried to lighten nothing
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      var x = (canvas.width / 2) - (img.width / 2) * scale;
      var y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
   
  var iD = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
  var dA = iD.data; 
  //filters

// for(var i = 0; i < dA.length; i += 4){
//   var red=  dA[i]                       //red
//   var green= dA[i+1]                     //green
//    var blue = dA[i+2]                     //blue
//   var hsl = rgbToHsl(red, green, blue)
//   hsl[2]+=val/100
//    var rgb = hslToRgb.apply(this, hsl)
//   dA[i] = rgb[0]
//   dA[i+1] = rgb[1]
//   dA[i+2] = rgb[2]
// }


   for(var i = 0; i < dA.length; i += 4)
     {
      dA[i] += 255 * (val / 100);
      dA[i+1] += 255 * (val / 100);
     dA[i+2] += 255 * (val / 100);
  }
  
  // var factor = (259.0 * (cont + 255.0)) / (255.0 * (259.0 - cont));

  // for (var i = 0; i < dA.length; i+= 4) {
  //   dA[i] = (factor * (dA[i] - 128.0) + 128.0);
  //   dA[i+1] = (factor * (dA[i+1] - 128.0) + 128.0);
  //   dA[i+2] = (factor * (dA[i+2] - 128.0) + 128.0);
  // }

  canvas.getContext('2d').putImageData(iD, 0, 0);
  
  }
}
  function checkvanvs() {
    setFile(null)
    var cnv = canva.current
    const ctx = cnv.getContext("2d")
    if (isCanvasEmpty(cnv))
        alert('Empty!');
    else
    ctx.clearRect(0, 0, cnv.width, cnv.height)
        
};

function isCanvasEmpty(cnv) {
    const blank = document.createElement('canvas');
    blank.width = cnv.width;
    blank.height = cnv.height;
    return cnv.toDataURL() === blank.toDataURL();
}

function menu(e){ //ads background colors and sets menu state that allows to detect which was cliccked
  a=e.target.dataset.value;
  for(let i=0; i<list.current.childNodes.length; i++){
    list.current.childNodes[i].classList.remove("clicked")
    if(a==i){
      e.target.parentNode.classList.add("clicked")
    }
    setMenus(a)
  }
}

    return (
      <div className="app">
        <Menu menuRef={list}  onClick={menu} />
        <Options>
        <Uploader op={menus}   onChange={addFile}/>
        <Delete op={menus} onClick={checkvanvs}/>
        <Slider op={menus} name="Brightness" value={val} min={"-70"} max={"70"} onClickRight={()=>{setVal(val+3); setBrightness()}} onClickLeft={()=>{setVal(val-3); setBrightness()}} />
        <Slider op={menus} name="Contrast" value={cont} min={"-70"} max={"70"} onClickRight={()=>{setCont(cont+3); setBrightness()}} onClickLeft={()=>{setCont(cont-3); setBrightness()}}/> 
        </Options>
        <ImageUpload canvaRef={canva} imageRef={image} src={file} />
      </div>
    );
  
}

export default App;

