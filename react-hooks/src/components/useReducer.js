import React, { useReducer } from "react";

const countReducer = (state, newState) => {
  return state + newState;
};

function UseReducer({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useReducer(countReducer, initialCount);
  const increment = () => setCount(count + step);

  return (
    <>
      <p>useReducer</p>
      <div>count: {count}</div>
      <button onClick={increment}>increment</button>
    </>
  );
}

export default UseReducer;
