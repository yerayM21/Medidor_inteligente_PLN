import React from "react";
import Navigationbar from "./components/includes/Navigationbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigationbar/>
      </Router>
    </div>
  );
}

export default App;
