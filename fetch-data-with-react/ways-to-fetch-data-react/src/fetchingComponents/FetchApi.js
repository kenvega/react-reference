import { useEffect, useState } from "react";
import User from "../components/User";
import Loading from "../components/Loading";

function FetchApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch it's already built-in in modern browsers
    fetch("https://randomuser.me/api") // change to "/apia" to trigger an error
      .then((response) => {
        setData(response);
        if (response.ok) {
          return response.json(); // with fetch you need to parse json data
        }
        throw response;
      })
      .then((data) => {
        setData(data.results[0]);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
      .finally(() => {
        // runs when promise finishes (being successful or not)
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>FetchApi</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default FetchApi;
