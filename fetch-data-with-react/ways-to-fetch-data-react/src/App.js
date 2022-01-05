import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FetchApi from "./FetchApi";
import Axios from "./Axios";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>hello</h1>
      <Routes>
        <Route path="/" element={<FetchApi />} />
        <Route path="/main" element={<Axios />} />
      </Routes>
      <h1>links</h1>
      <Link to="/">home link</Link>
      <br />
      <Link to="/main">main link</Link>
    </div>
  );
}

export default App;
