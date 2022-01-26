import axios from "axios";
import User from "../components/User";
import Loading from "../components/Loading";

import { useQuery } from "react-query";
// source: https://react-query.tanstack.com/reference/QueryClientProvider

function ReactQuery() {
  // queryInfo.data has the same information that response.data when you fetch with axios
  // but queryInfo.data starts as undefined

  // TODO: what is the key for? it seems it can be anything.. even 'pokemon'
  const queryInfo = useQuery("pokemon", () => {
    return axios("https://randomuser.me/api").then(
      (response) => response.data.results[0]
    );
    // you could also return with fetch, but you will always need to return a promise
    // return fetch("https://randomuser.me/api").then((res) => res.json())
  });

  console.log("queryInfo: ", queryInfo);

  // the queryInfo object has info about loading, error, or success
  const loading = queryInfo.isLoading;
  const data = queryInfo.data;

  return (
    <>
      <h2>React Query</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default ReactQuery;

// other endpoint to try: "https://pokeapi.co/api/v2/pokemon"
