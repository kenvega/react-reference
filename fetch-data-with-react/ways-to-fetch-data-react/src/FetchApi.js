import { useEffect, useState } from "react";

function FetchApi() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then((response) => {
        setData(response);
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log("data: ", data);
      });
  }, []);

  return (
    <>
      <div>FetchApi</div>
    </>
  );
}

export default FetchApi;
