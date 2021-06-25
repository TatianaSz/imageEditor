import React, { useState } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import "./css/app.css";



function App() {
  
    return (
      <div className="app">
        <Menu />
        <Options />
        <ImageUpload />
      </div>
    );
  
}

export default App;