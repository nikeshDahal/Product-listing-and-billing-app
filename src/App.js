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
  return (
    <div className="App">
      <header className="App-header"></header>
      <Basiclist />
      <Billinglist />
      {/* <Test/> */}
    </div>
  );
}

export default App;
