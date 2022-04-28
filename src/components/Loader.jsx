import React from 'react';

const Loader = () => {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  </div>
  );
}

export default Loader;
