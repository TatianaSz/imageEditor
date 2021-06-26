import React, { useState, useEffect } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";




function App() {
  const [file, setFile] = useState(null);
  
  
  const [filtr, setFiltr] = useState(100);
  function addValue(e){
  setFiltr(e.target.value)
  console.log(filtr)
  }
 
  
 function addFile(e){
  URL.revokeObjectURL(file)
   setFile(
    URL.createObjectURL(e.target.files[0])
    )
 
  }
  
  
   
    return (
      <div className="app">
        <Menu clicked="menu-clicked"/>
        <Options onChange={addFile} slider={addValue}/>
        <ImageUpload src={file} val={filtr}/>
      </div>
    );
  
}

export default App;