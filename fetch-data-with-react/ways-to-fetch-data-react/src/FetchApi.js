import { useEffect, useState } from "react";
import User from "./User";

function FetchApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div>FetchApi</div>
      {loading ? <p>loading</p> : <User data={data} />}
    </>
  );
}

export default FetchApi;
