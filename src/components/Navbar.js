import React from "react";

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>Planets</button>
      <button onClick={() => setPage("people")}>People</button>
      <button onClick={() => setPage("user")}>Users</button>
    </nav>
  );
};
export default Navbar;
