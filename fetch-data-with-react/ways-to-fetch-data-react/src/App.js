import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FetchApi from "./fetchingComponents/FetchApi";
import Axios from "./fetchingComponents/Axios";
import AsyncAwait from "./fetchingComponents/AsyncAwait";
import ReactFetchHook from "./fetchingComponents/ReactFetchHook";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Ways to fetch data with react</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>Home</h2>
              <p>Click links below to check ways to fetch</p>
            </>
          }
        />
        <Route path="/fetch" element={<FetchApi />} />
        <Route path="/axios" element={<Axios />} />
        <Route path="/async" element={<AsyncAwait />} />
        <Route path="/react-fetch-hook" element={<ReactFetchHook />} />
      </Routes>
      <h2>Links:</h2>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/fetch">fetch</Link>
        <Link to="/axios">axios</Link>
        <Link to="/async">async await</Link>
        <Link to="/react-fetch-hook">react fetch hook</Link>
      </div>
    </div>
  );
}

export default App;
