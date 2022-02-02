import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

// import Particular from "./Particular";
// import { sampleRecords } from "./Recordlists";
import Basiclist from "./Basiclist";
import Billinglist from "./Billinglist";
import Test from "./Test";

//component of records i.e particular starts here

//component of records i.e particular ends here

function App() {
  const [selectedList,setSelectedList]= useState('')
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="main-container">
      <div className="options-container">
        <div className="button-self-container">
        
        <button  onClick={e=>setSelectedList('Basic')} className={selectedList==='Basic'? 'selected':''}>
          <span className="listspan">Basic List</span>
        </button>

        </div>

        <div className="button-self-container">
        
        <button onClick={e=>setSelectedList('Billing')} className={selectedList==='Billing'? 'selected':''}>
          <span className="listspan">Billing List</span>
        </button>

        </div>
       
      </div>

      <div className="list-container">
      {selectedList==='Basic' && <Basiclist />}
      {selectedList==='Billing' && <Billinglist />}

      </div>
        
      </div>



      
      {/* <Test/> */}
      <header>
        <label></label>
      </header>
    </div>
  );
}

export default App;
