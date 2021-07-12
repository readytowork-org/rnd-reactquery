import { useState } from "react";

import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";
import Users from "./components/Users";

function App() {
  const [page, setPage] = useState("planets");
  return (
    <>
      <div className="App">
        <h1>Star wars information</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? <Planets /> : null}
          {page === "people" ? <People /> : null}
          {page === "user" ? <Users /> : null}
        </div>
      </div>
    </>
  );
}

export default App;
