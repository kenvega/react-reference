import { useState } from "react";
import useFetch from "react-fetch-hook";
import User from "../components/User";
import Loading from "../components/Loading";

function ReactFetchHook() {
  let data = null;
  const {
    isLoading: loading,
    error,
    data: response,
  } = useFetch("https://randomuser.me/api");

  if (error) {
    console.error(error);
    throw error;
  }

  if (response) {
    data = response.results[0];
  }

  // doesn't fail with data because loading only changes to true once there is data
  return (
    <>
      <h2>React Fetch Hook</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default ReactFetchHook;
