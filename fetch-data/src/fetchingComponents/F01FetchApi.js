import { useEffect, useState } from "react";
import User from "../components/User";
import Loading from "../components/Loading";

function F01FetchApi() {
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
      <h2>Fetch Api (built-in)</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default F01FetchApi;

// extra notes:
/*

  if you use the native fetch api it won't go to catch if you recieve a 404 error
    source: https://www.robinwieruch.de/react-fetching-data/#:~:text=Unfortunately%2C%20the%20native%20fetch%20API%20doesn%27t%20use%20its%20catch%20block%20for%20every%20erroneous%20status%20code

*/
