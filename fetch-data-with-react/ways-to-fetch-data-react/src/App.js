import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import FetchApi from "./fetchingComponents/FetchApi";
import Axios from "./fetchingComponents/Axios";
import AsyncAwait from "./fetchingComponents/AsyncAwait";
import ReactFetchHook from "./fetchingComponents/ReactFetchHook";
import ReactQuery from "./fetchingComponents/ReactQuery";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Ways to fetch data with react</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch" element={<FetchApi />} />
        <Route path="/axios" element={<Axios />} />
        <Route path="/async" element={<AsyncAwait />} />
        <Route path="/react-fetch-hook" element={<ReactFetchHook />} />
        <Route path="/react-query" element={<ReactQuery />} />
      </Routes>
      <h2>Links:</h2>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/fetch">fetch</Link>
        <Link to="/axios">axios</Link>
        <Link to="/async">async await</Link>
        <Link to="/react-fetch-hook">react fetch hook</Link>
        <Link to="/react-query">react query</Link>
      </div>
    </div>
  );
}

export default App;
