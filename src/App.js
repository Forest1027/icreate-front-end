import React from 'react';
import './App.css';
import IToolbar from "./components/UI/Toolbar/IToolbar";
import Introduction from "./components/Introduction/Introduction";

function App() {
  return (
    <div className="App">
      <IToolbar/>
      <Introduction/>
    </div>
  );
}

export default App;
