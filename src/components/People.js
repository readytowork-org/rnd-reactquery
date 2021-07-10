import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Person from "./Person";
const queryClient = new QueryClient();

const fetchPeople = async ({ queryKey }) => {
  const [key, page] = queryKey;
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], fetchPeople, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>
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
            {data?.results?.map((person, key) => (
              <Person key={key} person={person} />
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
      <People />
    </QueryClientProvider>
  );
}
