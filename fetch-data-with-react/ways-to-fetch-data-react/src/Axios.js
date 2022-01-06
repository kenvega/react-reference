function Axios() {
  // TODO: change for axios
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

  return <div>Axios</div>;
}

export default Axios;
