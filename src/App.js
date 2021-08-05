import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import Uploader from './Uploader'
import Delete from './Delete'
import Slider from './Slider'
import Filters from "./Filters"
import FiltersOpt from "./Filters--option"
import Flippin from './Flippin'
import Shapes from './Shapes'
import Inpute from './Inpute'
import DeleteDrawing from "./DeleteDrawing"
import FontContainer from "./FontContainer"
import ChooseFont from './ChooseFont'
import TextDimnesion from './TextDimension';
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";
import rec from "./images/gray.svg"
import circle from "./images/circle.svg"
import triangle from "./images/triangle.svg"
import heart from "./images/heart.svg"
import star from "./images/star.svg"
import bubble from "./images/bubble.svg"
import octagon from "./images/octagon.svg"




function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null);
  const filterCanva = useRef(null)
  const shapeCanva = useRef(null)
  const dim = useRef(null) //transparent div for text dimensions
  const downloadImage=useRef(null)
  

  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [sat, setSat] = useState(100);
  const [menus, setMenus] = useState("0")
  const [test, setTest] =useState([])
  const [scaleF, setScaleFill]=useState(0)
  const [dimensionArray, setDimensionArray]=useState([])
  const [inputVal, setInput] =useState("")
  const [inputColor, setInputColor] =useState("black")
  const [font, setFont] = useState("Catamaran")
  const [size, setSize] = useState(20)
  const [deg,setDeg] = useState(0)
  const [crop, setCrop] = useState({x:0,y:0,w:0,h:0,})
  const plswork = useRef({ x: -100, y: 0, w: 0, h: 0, color:inputColor, shape:"words", text:inputVal, ffont:font, fontSize:size, chosen:false})
  const [options, setOptions] = useState([2,10])
  let a;
  let dg=0;
  

  function addFile(e){
   URL.revokeObjectURL(file)
   setFile(
     URL.createObjectURL(e.target.files[0])
    )
   
    downloadImage.current.style.visibility="visible";
  }
  useEffect(() => {   
    const canvas = canva.current;
    const ctx = canvas.getContext("2d")
    const img = image.current;
    const shapeCanvas = shapeCanva.current;
    shapeCanvas.width=canvas.width;
    shapeCanvas.height=canvas.height;
    drawShapes()
    if(menus==1){
      const filterCanvas = filterCanva.current;
      for(let i=0; i<filterCanvas.children.length; i++){
        const filterCanvasCurrent=filterCanvas.children[i].children[0]
        const filterCanvasAll = filterCanvas.children[0].children[0]
        const fctx = filterCanvasCurrent.getContext("2d")
        var scaleToFill = Math.max(filterCanvasAll.width / img.width, filterCanvasAll.height / img.height)
        setScaleFill(scaleToFill)
        var x = (filterCanvasAll.width / 2) - (img.width / 2) * scaleF;
        var y = (filterCanvasAll.height / 2) - (img.height / 2) * scaleF;
       fctx.drawImage(img, x,y, img.width*scaleF, img.height*scaleF)
      }
    }
   
    img.onload=()=>{
     var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
     canvas.width=img.width*scale
     canvas.height=img.height*scale
     ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
     setTest(scale)
     
    }
  });
  useEffect(()=>{setBrightness()},[val,sat,cont])
  useEffect(()=>{drawShapes()},[dimensionArray])
  useEffect(()=>{confirmCrop()},[crop])

 const canvas = canva.current;
 const img = image.current;
 const shapeCanvas = shapeCanva.current;
  function reDraw(x,y){
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext("2d").drawImage(img, -x, -y, img.width * test, img.height * test);
  }
  function setBrightness(){
    let x1=crop.x;
    let y1=crop.y;
    if(img!=null&&img.width){ //checks if image is even there in case someone tried to lighten nothing
    reDraw(x1,y1)
    
      let iD=(dg==90||dg==-90||dg==270||dg==-270? canvas.getContext('2d').getImageData(0, 0, img.height, img.width):canvas.getContext('2d').getImageData(0, 0, img.width, img.height))
    let dA = iD.data;
    var sv = (sat/100); // saturation value. 0 = grayscale, 1 = original, 2=max saturation

    var az = (1 - sv)*0.3086 + sv;
    var bz = (1 - sv)*0.6094;
    var cz = (1 - sv)*0.0820;
    var dz = (1 - sv)*0.3086;
    var ez = (1 - sv)*0.6094 + sv;
    var fz = (1 - sv)*0.0820;
    var gz = (1 - sv)*0.3086;
    var hz = (1 - sv)*0.6094;
    var iz = (1 - sv)*0.0820 + sv;
    
    for(var i = 0; i < dA.length; i += 4)
    {
      var red = dA[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
      var green = dA[i + 1];
      var blue = dA[i + 2];
    
      var saturatedRed = (az*red + bz*green + cz*blue);
      var saturatedGreen = (dz*red + ez*green + fz*blue);
      var saturateddBlue = (gz*red + hz*green + iz*blue);
    
      dA[i] = saturatedRed;
      dA[i + 1] = saturatedGreen;
      dA[i + 2] = saturateddBlue;
    }
      
    for(var i = 0; i < dA.length; i += 4)
    {
      dA[i] += 255 * (val/100);
      dA[i+1] += 255 * (val/ 100);
      dA[i+2] += 255 * (val/100);
    }
    
    var factor = (259.0 * (cont + 255.0)) / (255.0 * (259.0 - cont));

    for (var i = 0; i < dA.length; i+= 4) {
      dA[i] = (factor * (dA[i] - 128.0) + 128.0);
      dA[i+1] = (factor * (dA[i+1] - 128.0) + 128.0);
      dA[i+2] = (factor * (dA[i+2] - 128.0) + 128.0);
    }
    canvas.getContext('2d').putImageData(iD, 0, 0);
    }
  }
  function flippinTime(wziu, bziu, dg){
    const ctx = canvas.getContext("2d")
    if(wziu==1){
      if(dg==0||dg==360||dg==-360||dg==180||dg==-180){ 
        ctx.translate(0,canvas.height);
        ctx.scale(1,-1)
        }
      else if(dg==90||dg==-270||dg==270||dg==-90){
        ctx.translate(canvas.height,0); 
        ctx.scale(-1,1)
        }
      }
    else if(wziu==-1){
      if(dg==0||dg==360||dg==-360||dg==180||dg==-180){ 
        ctx.translate(canvas.width,0); 
        ctx.scale(-1,1)
        }
      else if(dg==90||dg==-270||dg==270||dg==-90){
        ctx.translate(0,canvas.width); 
        ctx.scale(1,-1)
        }
      }
    else {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    if(dg==90 ||dg==-270){
      canvas.setAttribute("width", crop.h==0?img.height*test:crop.h)
      canvas.setAttribute("height", crop.w==0?img.width*test:crop.w)
      ctx.translate(canvas.width,0)
      ctx.rotate(dg * Math.PI / 180)
    }
    else if(dg==180||dg==-180){
      canvas.setAttribute("width", crop.w==0?img.width*test:crop.w)
      canvas.setAttribute("height", crop.h==0?img.height*test:crop.h)
      ctx.translate(canvas.width,canvas.height)
      ctx.rotate(dg * Math.PI / 180)
    }
    else if(dg==270||dg==-90){
      canvas.setAttribute("width", crop.h==0?img.height*test:crop.h)
      canvas.setAttribute("height", crop.w==0?img.width*test:crop.w)
      ctx.translate(0,canvas.height)
      ctx.rotate(-90 * Math.PI / 180)
    }
    else if(dg==0 || dg==360 ||dg==-360){
      canvas.setAttribute("width", crop.w==0?img.width*test:crop.w)
      canvas.setAttribute("height", crop.h==0?img.height*test:crop.h)
      ctx.translate(0,0)
      ctx.rotate(dg * Math.PI / 180)
    }
    }
    setBrightness(crop.x,crop.y)
  }
  function checkvanvs() {
      setFile(null)
      var cnv = canva.current
      const ctx = cnv.getContext("2d")
      if (isCanvasEmpty(cnv))
          alert('Empty!');
      else
      ctx.clearRect(0, 0, cnv.width, cnv.height)
      cnv.width=600;
      cnv.height=600;
      setVal(0)
      setCont(0)
      setSat(100)
          
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

function rotato(x,y,w,h,rad){
  let ctx = shapeCanvas.getContext("2d")
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rad); 
  ctx.translate(-(x + w / 2), -(y + h / 2));
}

  function applyFilter(van, conn, satn){
  setVal(van)
  setCont(conn)
  setSat(satn)
  }
  function drawCircle(x, y, radius) {
    let ctx = shapeCanvas.getContext("2d")
    ctx.fillStyle = "#ea80fc";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  function drawHandles(x,y,w,h) {
    drawCircle(x, y, 8);
    drawCircle(x + w, y, 8);
    drawCircle(x + w, y + h, 8);
    drawCircle(x, y + h, 8);
  }
  function handleHitbox(p1,p2){
  return Math.abs(p1 - p2) < 8;
  }
  function drawStar(cx, cy,w,h, spikes, outerRadius, innerRadius,color,ctx,rotat) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.fillStyle=color;
    ctx.fill();
  

  }
  function drawEllipse(x,y,w,h,color,ctx,rot){
    ctx.save()
    ctx.beginPath();
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.ellipse(x+w/2, y+h/2, w/2,h/2,2 * Math.PI, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
  function drawHeart(x,y,w,h,color,ctx,rot){
    ctx.save();
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x+w/2, y+h/4);
    ctx.bezierCurveTo(x+w/2+w/8, y, x+w-w/10, y, x+w-w/50, y+h/4);
    ctx.bezierCurveTo(x+w,y+h/3,x+w-w/50,y+h/3+h/20,x+w-w/40,y+h/3+h/10)
    ctx.bezierCurveTo(x+w-w/25,y+h/3+h/6,x+w-w/40,y+h/3+h/8,x+w-w/10,y+h/2+h/10)
    ctx.bezierCurveTo(x+w-(w/11),y+h/2+h/9,x+w/2+w/100,y+h-h/50,x+w/2,y+h)
    ctx.bezierCurveTo(x+w/2-w/100,y+h-h/50,x+(w/11),y+h/2+h/9,x+w/10,y+h/2+h/10)
    ctx.bezierCurveTo(x+w/40,y+h/3+h/8,x+w/25,y+h/3+h/6,x+w/40,y+h/3+h/10)
    ctx.bezierCurveTo(x+w/50,y+h/3+h/20,x,y+h/3,x+w/50, y+h/4)
    ctx.bezierCurveTo(x+w/10, y,x+w/2-w/8, y,  x+w/2, y+h/4);
    ctx.fill();     
    ctx.closePath();
    ctx.restore();
  }
  function drawTriangle(x,y,w,h,color,ctx,rot){
    ctx.save();
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+w/2, y);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x+w, y+h);
    ctx.lineTo(x+w/2, y);
    ctx.fill();
    ctx.restore()
  }
  function drawRectangle(x,y,w,h,color,ctx,rot){
    ctx.save()
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
  function drawWords(x,y,w,h,color,ctx,rot,ffont,fontSize,chosen,text){
    ctx.save()
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath(); //woords
    ctx.fillStyle = color;
    ctx.save();
    if(chosen){
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
    }
    else{
        ctx.fillStyle = "rgba(255, 255, 255, 0.0)"
    }
    ctx.fillRect(x,y, w, h);
    ctx.restore()
    ctx.font = fontSize +"px" + " " + ffont;
    ctx.fillText(text, x, y+(h*0.85));  
    ctx.restore();
  }
  function drawBubble(x,y,w,h,color,ctx,rot){
    ctx.save();
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x+w/2.6,y+h/8);
    ctx.quadraticCurveTo(x+w/8,y+h/8,x+w/8,y+h/3.2);
    ctx.quadraticCurveTo(x+w/8,y+h/2,x+w/4,y+h/2);
    ctx.quadraticCurveTo(x+w/4,y+h/1.6,x+w/6.6,y+h/1.6);
    ctx.quadraticCurveTo(x+w/3.3,y+h/1.6,x+w/3,y+h/2);
    ctx.quadraticCurveTo(x+w/1.6,y+h/2,x+w/1.6,y+h/3.2);
    ctx.quadraticCurveTo(x+w/1.6,y+h/8,x+w/2.6,y+h/8);
    ctx.fill()
    ctx.restore();
  }
  function drawBevel(x,y,w,h,color,ctx,rot){
    ctx.save();
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x+w/6,y);
    ctx.lineTo(x+w-w/6,y)
    ctx.lineTo(x+w,y+h/6);
    ctx.lineTo(x+w,y+h-h/6);
    ctx.lineTo(x+w-w/6,y+h);
    ctx.lineTo(x+w/6,y+h);
    ctx.lineTo(x,y+h-h/6);
    ctx.lineTo(x,y+h/6);
    ctx.closePath();
    ctx.fill()
    ctx.restore()
  }
  function drawCut(x,y,w,h,color,ctx){
    
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(x, y, w, h);
    ctx.stroke()
    ctx.moveTo(x+w/3,y)
    ctx.lineTo(x+w/3,y+h)
    ctx.moveTo(x+w*2/3,y)
    ctx.lineTo(x+w*2/3,y+h)
    ctx.moveTo(x,y+h/3)
    ctx.lineTo(x+w,y+h/3)
    ctx.moveTo(x,y+h*2/3)
    ctx.lineTo(x+w, y+h*2/3)
    ctx.stroke();
    
  }


  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;
  let lt = false;
  let lb = false;
  let rt = false;
  let rb = false;
  function drawShapes(){
    if(shapeCanvas !==null) {
    shapeCanvas.getContext("2d").clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
    dimensionArray.forEach(dim=>draw(dim))
  } }

function draw(dim){
  let ctx = shapeCanvas.getContext("2d")
  let {x,y,w,h,color,shape,text,ffont,fontSize,rot,chosen} = dim;
  switch(shape){
    case "words":
      drawWords(x,y,w,h,color,ctx,rot,ffont,fontSize,chosen,text);
      break;
    case "cut":
      drawCut(x,y,w,h,color,ctx)
      drawHandles(x,y,w,h);
      break;
    case "rectangle":
      drawRectangle(x,y,w,h,color,ctx,rot)
      if(chosen){
      drawHandles(x,y,w,h);
      }
      break;
    case "circle":
      drawEllipse(x,y,w,h,color,ctx,rot)
      if(chosen){
        drawHandles(x,y,w,h);
        }
      break;
    case "heart":
      drawHeart(x,y,w,h,color,ctx,rot)
      if(chosen){
        drawHandles(x,y,w,h);
        }
      break;
    case "star":
      drawStar(x+w/2, y+h/2,w,h,5, w/2, h/5,color,ctx,rot);
      if(chosen){
        drawHandles(x,y,w,h);
        }
      break;
    case "bubble":
      drawBubble(x,y,w,h,color,ctx,rot);
      if(chosen){
        drawHandles(x,y,w,h);
        }
      break;
      case "bevel":
        drawBevel(x,y,w,h,color,ctx,rot);
        if(chosen){
          drawHandles(x,y,w,h);
          }
      break;

    default:
      drawTriangle(x,y,w,h,color,ctx,rot)
      if(chosen){
        drawHandles(x,y,w,h);
        }
      break;
  }
  }

let pointX1,pointY1,pointX2,pointY2,originX,originY,firstX,secondX,firstY,secondY;

const hitBox = (x, y) => {
  let isTarget = true;
  let degg;
  for (let i = dimensionArray.length-1; i>=0; i--) { //changed the direction of going through the array, so the last rendered elemens will have priority!
    const box = dimensionArray[i];
    if((menus=="4")||(menus=="2")){
    if(handleHitbox(x,box.x+box.w)&&handleHitbox(y,box.y+box.h)){
      rb=true;
      dragTarget = box;
    }
    else if(handleHitbox(x,box.x)&&handleHitbox(y,box.y+box.h)){
      lb=true;
      dragTarget = box;
    }
    else if(handleHitbox(x,box.x+box.w)&&handleHitbox(y,box.y)){
      rt=true;
      dragTarget = box;
    }
    else if(handleHitbox(x,box.x)&&handleHitbox(y,box.y)){
      lt=true;
      dragTarget = box;
    }
  }    

    if(deg<=90&&deg>=0||(deg>180&& deg<=270)){
      if(deg>180){
        degg= (deg * Math.PI / 180)-(180*Math.PI/180);
      }
      else{
      degg= deg * Math.PI / 180;}
      originX=(box.x+(box.w/2))
      originY=(box.y+(box.h/2));
      pointX1=box.x
      pointY1 = box.y
      pointX2=(box.x+box.w);
      pointY2 =(box.y+box.h)
     // console.log(originX,originY)
    }
    else if((deg>90&&deg<=180)||(deg>270&&deg<=360)){
      if(deg<=180){
      degg= (deg * Math.PI / 180)-(90*Math.PI/180);}
      else{
        degg= (deg * Math.PI / 180)-(270*Math.PI/180);
      }
      pointX1=Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2));
      pointY1 = Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2));
      pointX2=(Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2)))+box.h
      pointY2 =(Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2)))+box.w
      originX=(Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2))+(box.h/2))
     originY=(Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2))+(box.w/2));
    }
   
    firstX =Math.cos(degg)*(pointX1-originX)-Math.sin(degg)*(pointY2-originY)+originX;
    secondX = Math.cos(degg)*(pointX2-originX)-Math.sin(degg)*(pointY1-originY)+originX;
    firstY =Math.sin(degg)*(pointX1-originX)+Math.cos(degg)*(pointY1-originY)+originY;
    secondY =(pointX2-originX)*Math.sin(degg)+Math.cos(degg)*(pointY2-originY)+originY;
    //console.log("x,y",pointX1,pointY1,firstX,firstY,"x2,y2:", pointX2,pointY2, secondX,secondY)
       if ((x >= firstX) && x <= (secondX) && y >= (firstY) && y <= (secondY))
    {
      dragTarget = box; //currently dragged element
      plswork.current=box;
      isTarget = true;
      break;
    }
  
}
  return {isTarget: isTarget, lt:lt, lb:lb, rt:rt,rb:rb};
}

const handleMouseDown = e => {
  
  startX = parseInt(e.nativeEvent.offsetX)
  startY = parseInt(e.nativeEvent.offsetY)
  isDown = hitBox(startX, startY).isTarget;
  rt=hitBox(startX, startY).rt; rb=hitBox(startX, startY).rb; lt=hitBox(startX, startY).lt; lb=hitBox(startX, startY).lb;
  for (let i = 0; i <dimensionArray.length; i++) {
    dimensionArray[i].chosen=false;
  }
  if(dragTarget!=null&& plswork.current!=null){
  plswork.current.chosen=true;
  if(dim.current!=null){
  dim.current.style.fontFamily=plswork.current.ffont; //its changing css styling of a div and then we are getting its dimensions back
  dim.current.innerHTML = plswork.current.text;
  }
}
  else if(plswork.current!=null){
    plswork.current.chosen=false;
    dragTarget=null;
    plswork.current =null;
  }
  drawShapes()
}

const handleMouseMove = e => {
  if(dragTarget==null) return
  if(dragTarget.h<=20||dragTarget.w<=20) {dragTarget.h=20;dragTarget.w=20;} //its not allowing current shape to have negative values
  const mouseX = parseInt(e.nativeEvent.offsetX)
  const mouseY = parseInt(e.nativeEvent.offsetY)
  if(menus=="4"||dragTarget.shape=="cut"){
  if (lt) {
    const dx=mouseX-startX;
  const dy=mouseY-startY;
  startX=mouseX;
  startY=mouseY;
  dragTarget.w -=dx
  dragTarget.h -=dy
  dragTarget.x=mouseX
    dragTarget.y=mouseY
} else if (rt) {
  const dx=mouseX-startX;
  const dy=mouseY-startY;
  startX=mouseX;
  startY=mouseY;
  dragTarget.w +=dx
  dragTarget.h -=dy
  dragTarget.y=mouseY
} else if (lb) {
  const dx=mouseX-startX;
  const dy=mouseY-startY;
  startX=mouseX;
  startY=mouseY;
  dragTarget.w -=(dx);
  dragTarget.h += (dy);
  dragTarget.x=mouseX
} else if (rb) {
  const dx=mouseX-startX;
  const dy=mouseY-startY;
  startX=mouseX;
  startY=mouseY;
  dragTarget.w +=(dx);
  dragTarget.h += (dy);
}
  }
  if (!isDown) return;
  
  const dx = mouseX - startX;
  const dy = mouseY - startY;
  startX = mouseX;
  startY = mouseY;
  dragTarget.x += dx;
  dragTarget.y += dy;
  if(dragTarget.shape=="cut"){
    if(dragTarget.x<=0)dragTarget.x=0
    if(dragTarget.y<=0)dragTarget.y=0
    else if(dragTarget.y+dragTarget.h>=canvas.height){return}
    else if(dragTarget.x+dragTarget.w>=canvas.width)return
  }
  drawShapes();
  
}
const handleMouseUp = e => {
  dragTarget = null;
  isDown = false;
  lt=false; lb=false; rt=false; rb=false;
}
const handleMouseOut = e => {
  dragTarget = null;
  isDown = false;
  lt=false; lb=false; rt=false; rb=false;
}

function inputChange(e){
  setInput(e.target.value);
  dim.current.innerHTML=e.target.value

}
function giveInputColor(e){
    setInputColor(e.target.value)
    plswork.current.color=e.target.value
    setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
    drawShapes()
    
}

function changeNumber(e){
  if(plswork.current.shape==="words"){
  setSize(e.target.value)
  dim.current.style.fontSize = e.target.value + "px"
  if(plswork.current!=null){
  plswork.current.fontSize=e.target.value
  plswork.current.w=dim.current.clientWidth
  plswork.current.h=dim.current.clientHeight}
  setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
  drawShapes()
  }
}

function rotateText(e){
  setDeg(e.target.value)
  if(plswork.current!=null){
    plswork.current.rot=e.target.value;
    setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
  }
  drawShapes()
}

function changeFont(e){
      setFont(e.target.dataset.fonts)
plswork.current.ffont=e.target.dataset.fonts
dim.current.style.fontFamily=e.target.dataset.fonts
plswork.current.w=dim.current.clientWidth
plswork.current.h=dim.current.clientHeight
setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
drawShapes()
}

function deleteCurrent(){
  setDimensionArray(dimensionArray=>[...dimensionArray].filter((element,index)=>index!=dimensionArray.indexOf(plswork.current)))
   drawShapes()
}
function confirmCrop(){
  if(shapeCanvas!=null){
    let cropNet = [...dimensionArray].filter((element)=>element.shape=="cut");
  shapeCanvas.width=cropNet[0].w
  shapeCanvas.height=cropNet[0].h
  canvas.width=cropNet[0].w
  canvas.height=cropNet[0].h
  setDimensionArray(dimensionArray=>[...dimensionArray].filter((element)=>element.shape!="cut"))
  setBrightness(crop.x,crop.y)
  }
}
function cropOptions(){
setOptions([...options].reverse())
}
function downloadFinished(){
  const ctx=canvas.getContext("2d")
  ctx.drawImage(shapeCanvas,0,0);
 const image=canvas.toDataURL("image/png")
 .replace("image/png", "image/octet-stream");
  downloadImage.current.setAttribute("href", image);
}

    return (
      <div className="app">
        <Menu menuRef={list}  onClick={menu} />
        <Options>
          <Uploader op={menus}   onChange={addFile}/>
          <Delete op={menus} onClick={checkvanvs}/>
          <Shapes op={menus} gener="0" name={"Download"} downloadRef={downloadImage}  onClick={()=>{downloadFinished()}}/>
          <Slider op={menus}  name="Brightness" value={val} min={"-70"} max={"70"} onClickRight={()=>setVal(val+3)} onClickLeft={()=>{setVal(val-3)}} />
          <Slider op={menus} name="Contrast" value={cont} min={"-70"} max={"70"} onClickRight={()=>{setCont(cont+3)}} onClickLeft={()=>{setCont(cont-3)}}/> 
          <Slider op={menus}  name="Saturation" value={sat} min={"0"} max={"200"} onClickRight={()=>{setSat(sat+3)}} onClickLeft={()=>{setSat(sat-3)}}/>
          <Filters op={menus} filterCanvaRef={filterCanva}>
            <FiltersOpt op={menus} class="normal" title="Normal" onClick={()=>applyFilter(0,0,100)}/>
            <FiltersOpt op={menus} class="gloomy" title="Gloomy days" onClick={()=>applyFilter(0,-21,139)}/>
            <FiltersOpt op={menus} class="gray" title="Grayscale" onClick={()=>applyFilter(-12,15,1)}/>
            <FiltersOpt op={menus} class="retro" title="Retro" onClick={()=>applyFilter(0,-15,64)}/>
            <FiltersOpt op={menus} class="sunny" title="Sunny beach" onClick={()=>applyFilter(0,21,187)}/>
            <FiltersOpt op={menus} class="sweet" title="Sweet rose" onClick={()=>applyFilter(0,57,55)}/>
          </Filters>
          <Flippin op={menus} name="Flip" horr="Horizontally" verr="Vertically" hor={function(){flippinTime(1,-1,dg)}} ver={function(){flippinTime(-1,1,dg)}}/>
          <Flippin op={menus} name="Rotate" horr="Left" verr="Right" hor={function(){if(dg==-360){dg=0}dg-=90;flippinTime(0,-1, dg)}} ver={function(){if(dg==360){dg=0}dg+=90;flippinTime(0,1, dg)}}/> 
          <Shapes op={menus} generic={options[0]} name={"Crop"} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 0, y: 0, w: 200, h: 150, color:"rgba(255, 255, 255, 0.0)", shape:"cut" }]);cropOptions()}} />
          <Shapes op={menus} generic={options[1]} name={"Confirm"}  onClick={()=>{  let cropNet = [...dimensionArray].filter((element)=>element.shape=="cut");let x=cropNet[0].x; let y = cropNet[0].y; let w=cropNet[0].w; let h=cropNet[0].h; setCrop(crop=>{return{...crop,x:x,y:y,w:w,h:h}});cropOptions()}}/>
          <Shapes op={menus} generic={options[1]} name={"Cancel"}  onClick={()=>{cropOptions();  setDimensionArray(dimensionArray=>[...dimensionArray].filter((element)=>element.shape!="cut"))}}/>
            
            <Inpute op={menus} generic="3"  type="text" inputLabel="Write your text:" onChange={inputChange}/>
            <Inpute op={menus} generic="3" type="color" inputLabel="Choose text color: " onChange={giveInputColor}/>
            <Inpute op={menus} generic="3" type="number" min="1" inputLabel="Change text size:" onChange={changeNumber}/>
            <Inpute op={menus} generic="3" type="number" inputLabel="Rotate text:" onChange={rotateText}/>
            <Shapes op={menus} generic="3" name="Add your text" onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w:dim.current.clientWidth, h:dim.current.clientHeight, color:inputColor, shape:"words", text:inputVal, ffont:font, fontSize:size, rot:deg, chosen:false}])}}/>
            <FontContainer op={menus} generic="3">
              <ChooseFont op={menus} generic="3" chosen="Festive" text="Holding out for a Hero"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Cookie" text="Where have all the good men gone"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Catamaran" text="And where are all the gods?"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Bangers" text="'Til the morning light"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Amatic SC" text="Fresh from the fight"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Gloria Hallelujah" text="Larger than life"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Indie Flower" text="Somwhere after midnight"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Lobster" text="In my wildest fantasy"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Nanum Pen Script" text="Racing on the thunder"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Pacifico" text="Rising with the heat"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Permanent Marker" text="Sweep me off my feet"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="VT323" text="Splits the sea"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Sigmar One" text="Where the mountains meet the heavens"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Yellowtail" text="Like the fire in my blood"  onClick={changeFont}/>
            </FontContainer>
            <TextDimnesion dimRef={dim} op={menus}/>
            <Inpute op={menus} generic="4" type="color" inputLabel="Choose text color: " onChange={giveInputColor}/>
          <Shapes op={menus} generic="4" name={<img src={rec} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h: 150, color:"#dedede", shape:"rectangle" ,chosen:false, rot:deg }]);}} />
          <Shapes op={menus} generic="4" name={<img src={triangle} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede",chosen:false }]);}} />
          <Shapes op={menus} generic="4" name={<img src={circle} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede", shape:"circle",chosen:false }]);}} />
          <Shapes op={menus} generic="4" name={<img src={heart} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede", shape:"heart" ,chosen:false}]);}} />
          <Shapes op={menus} generic="4" name={<img src={star} width="60"height="60"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede", shape:"star",chosen:false }]);}} />
          <Shapes op={menus} generic="4" name={<img src={bubble} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede", shape:"bubble",chosen:false }]);}} />
          <Shapes op={menus} generic="4" name={<img src={octagon} width="50"height="50"/>} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 1, y: 1, w: 200, h:200, color:"#dedede", shape:"bevel" ,chosen:false}]);}} />
          <DeleteDrawing op={menus} generic="3" name="Delete" onClick={()=>deleteCurrent()} />
          <DeleteDrawing op={menus} generic="4" name="Delete" onClick={()=>deleteCurrent()} />
          </Options>
    
        <ImageUpload canvaRef={canva} shapeCanvaRef={shapeCanva} imageRef={image} src={file} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut} >
    
      </ImageUpload>
      
      </div>
    );
  
}

export default App;

