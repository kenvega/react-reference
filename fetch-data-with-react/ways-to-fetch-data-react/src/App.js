import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FetchApi from "./fetchingComponents/FetchApi";
import Axios from "./fetchingComponents/Axios";
import AsyncAwait from "./fetchingComponents/AsyncAwait";

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
              <p>Click links to check other ways</p>
            </>
          }
        />
        <Route path="/fetch" element={<FetchApi />} />
        <Route path="/axios" element={<Axios />} />
        <Route path="/async" element={<AsyncAwait />} />
      </Routes>
      <h2>Links:</h2>
      <Link to="/">home</Link>
      <br />
      <Link to="/fetch">fetch</Link>
      <br />
      <Link to="/axios">axios</Link>
      <br />
      <Link to="/async">async await</Link>
    </div>
  );
}

export default App;
