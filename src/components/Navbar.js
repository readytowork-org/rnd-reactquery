import React from "react";

const Navbar = ({ page, setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>
        {" "}
        {page === "planets" ? <h4>Planets</h4> : "Planets"}
      </button>
      <button onClick={() => setPage("people")}>
        {" "}
        {page === "people" ? <h4>People</h4> : "People"}
      </button>
      <button onClick={() => setPage("user")}>
        {" "}
        {page === "user" ? <h4>User</h4> : "User"}
      </button>
    </nav>
  );
};
export default Navbar;
