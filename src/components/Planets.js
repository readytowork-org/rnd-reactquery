import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Planet from "./Planet";
const queryClient = new QueryClient();

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
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
