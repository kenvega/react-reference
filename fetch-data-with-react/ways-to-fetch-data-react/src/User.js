function User({ data }) {
  return (
    <>
      <p>Data from user</p>
      <p>Id: {data.id.name === "" ? "no id" : data.id.name}</p>
      <p>Email: {data.email}</p>
      <p>
        Full name: {data.name.title} {data.name.first} {data.name.last}
      </p>
    </>
  );
}

export default User;
