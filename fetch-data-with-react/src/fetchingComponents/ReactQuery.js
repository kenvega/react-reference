// import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery } from "react-query";
// TODO: it seems that it needs a QueryClientProvider
// source: https://react-query.tanstack.com/reference/QueryClientProvider

// import User from "../components/User";
// import Loading from "../components/Loading";

function ReactQuery() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // console.log("useQuery: ", useQuery);
  // useQuery needs a unique key for the data we are fetching

  // axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
  //   console.log(response.data);
  // });

  const queryInfo = useQuery("pokemon", () =>
    fetch("https://pokeapi.co/api/v2/pokemon").then((res) => res.json())
  );
  // console.log("queryInfo: ", queryInfo);

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
      {/* {loading ? <Loading /> : <User data={data} />} */}
    </>
  );
}

export default ReactQuery;
