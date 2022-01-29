import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
// component names can't start with a number but I want them to be numbered so there is a default order on fetchingComponents files
import F01FetchApi from "./fetchingComponents/F01FetchApi";
import F02Axios from "./fetchingComponents/F02Axios";
import F03AsyncAwait from "./fetchingComponents/F03AsyncAwait";
import ReactFetchHook from "./fetchingComponents/ReactFetchHook";
import ReactQuery from "./fetchingComponents/ReactQuery";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Ways to fetch data with react</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch" element={<F01FetchApi />} />
        <Route path="/axios" element={<F02Axios />} />
        <Route path="/async" element={<F03AsyncAwait />} />
        <Route path="/react-fetch-hook" element={<ReactFetchHook />} />
        {/* TODO: try the component now */}
        <Route
          path="/react-query"
          element={
            <QueryClientProvider client={queryClient}>
              <ReactQuery />
            </QueryClientProvider>
          }
        />
      </Routes>
      <h2>Links:</h2>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/fetch">fetch api</Link>
        <Link to="/axios">axios</Link>
        <Link to="/async">async await</Link>
        <Link to="/react-fetch-hook">react fetch hook</Link>
        <Link to="/react-query">react query</Link>
      </div>
    </div>
  );
}

export default App;
