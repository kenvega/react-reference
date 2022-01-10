import { useState } from "react";
import useFetch from "react-fetch-hook";
import User from "../components/User";
import Loading from "../components/Loading";

function ReactFetchHook() {
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const {
    isLoading: loading,
    error,
    data: response,
  } = useFetch("https://randomuser.me/api");
  console.log("loading: ", loading);
  console.log("response: ", response);
  // if (response) {
  //   setData(response.results[0]);
  // }

  // useEffect(() => {
  //   // fetch it's already built-in in modern browsers
  //   fetch("https://randomuser.me/api") // change to "/apia" to trigger an error
  //     .then((response) => {
  //       setData(response);
  //       if (response.ok) {
  //         return response.json(); // with fetch you need to parse json data
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       setData(data.results[0]);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw error;
  //     })
  //     .finally(() => {
  //       // runs when promise finishes (being successful or not)
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      <h2>React Fetch Hook</h2>
      <p>loading: {loading.toString()}</p>
      {/* {loading ? <Loading /> : <User data={data} />} */}
    </>
  );
}

export default ReactFetchHook;
