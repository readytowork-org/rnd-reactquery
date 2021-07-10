import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Person from "./Person";
const queryClient = new QueryClient();

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching</div>}
      {status === "success" && (
        <div>
          {data.results.map((person, key) => (
            <Person key={key} person={person} />
          ))}
        </div>
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
