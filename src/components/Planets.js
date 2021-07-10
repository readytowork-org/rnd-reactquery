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
  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.next ? old : old + 1))
            }
            disabled={!data || !data.next}
          >
            Next page
          </button>
          <div>
            {data?.results?.map((planet, key) => (
              <Planet key={key} planet={planet} />
            ))}
          </div>
        </>
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
