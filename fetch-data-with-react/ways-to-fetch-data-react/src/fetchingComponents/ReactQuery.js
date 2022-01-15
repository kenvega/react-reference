import { useEffect, useState } from "react";

import User from "../components/User";
import Loading from "../components/Loading";

function ReactQuery() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios("https://randomuser.me/api") // change to "/apia" to trigger an error
  //     .then((response) => {
  //       console.log("this will be data on axios: ", response.data.results[0]);
  //       setData(response.data.results[0]); // with axios you don't need to parse json data
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
      <h2>React Query</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default ReactQuery;
