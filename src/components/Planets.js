import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Planet from "./Planet";
const queryClient = new QueryClient();

const fetchPlanets = async ({ queryKey }) => {
  const [key, page] = queryKey;
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet, key) => (
            <Planet key={key} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};
export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <Planets />
    </QueryClientProvider>
  );
}
