import logo from "./logo.svg";
import "./App.css";

import React from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [body, setBody] = React.useState();
  const [status, setStatus] = React.useState("idle");
  const fetchConfig = {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  };

  const makeFetchRequest = () => (body ? fetch("/post", fetchConfig) : null);

  React.useEffect(() => {
    const promise = makeFetchRequest();
    // if no promise was returned, then we didn't make a request
    // so we'll exit early
    if (!promise) return;
    setStatus("pending");
    promise.then(
      () => setStatus("fulfilled"),
      () => setStatus("rejected")
    );
  }, [makeFetchRequest]);

  function handleSubmit(event) {
    event.preventDefault();
    // get form input values
    // setBody(formInputValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs and other neat stuff... */}
    </form>
  );
}

export default App;
