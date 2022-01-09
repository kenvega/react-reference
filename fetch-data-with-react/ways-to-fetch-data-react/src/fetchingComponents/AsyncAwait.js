import { useEffect, useState } from "react";
import axios from "axios";
import User from "../components/User";
import Loading from "../components/Loading";

function Axios() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useffect cannot be used with async await
  // source: https://www.robinwieruch.de/react-hooks-fetch-data/#:~:text=There%20is%20one%20last%20catch
  // source: https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

  // an effect should return nothing or a clean up function
  // and async await returns a promise so is not allowed directly used in useEffect
  // use it inside the effect function
  useEffect(() => {
    const fetchData = async () => {
      await axios("https://randomuser.me/api") // change to "/apia" to trigger an error
        .then((response) => {
          setData(response.data.results[0]); // with axios you don't need to parse json data
        })
        .catch((error) => {
          console.error(error);
          throw error;
        })
        .finally(() => {
          // runs when promise finishes (being successful or not)
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Async ~ Await</h2>
      {loading ? <Loading /> : <User data={data} />}
    </>
  );
}

export default Axios;
