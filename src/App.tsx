import "./App.css"
import { Routes, Route, Link } from "react-router-dom"
import CornerstoneOld from "./components/CornerstoneOld";
import ReactCornerstone from "./components/ReactCornerstone";
import React from "react";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<CornerstoneOld />}></Route>
          <Route path="/1" element={<ReactCornerstone />}></Route>
          <Route path="/2" element={<Main />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App
