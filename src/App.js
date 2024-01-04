import React from 'react';
import './App.css';
import Createjoinpage from "./Component/Createjoinpage";
import Chatpage from "./Component/Chatpage";
import { Route, Routes } from "react-router-dom";




function App() {
  return (

    <>
      <Routes>
        <Route path="/" element={<Createjoinpage />} ></Route>
        <Route path="/chatpage" element={<Chatpage />}></Route>
      </Routes>

      {/* $env:NODE_OPTIONS = "--openssl-legacy-provider" */}
    </>

  );
}


export default App;

