import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ContextExample1 from "./ContextExample1";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>How context works</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/context_example_1" element={<ContextExample1 />} />
      </Routes>
      <h2>Links:</h2>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/context_example_1">context example 1</Link>
      </div>
    </div>
  );
}

export default App;
