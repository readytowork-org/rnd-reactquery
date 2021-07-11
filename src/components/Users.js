import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import User from "./User";
const queryClient = new QueryClient();

const fetchUsers = async ({ queryKey }) => {
  const [key, page] = queryKey;
  const res = await fetch(`http://localhost:8000/user/?page=${page}`);
  return res.json();
};

const Users = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["users", page], fetchUsers, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  console.log(data?.data?.rows, "here is data");

  return (
    <div>
      <h2>Users</h2>
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
            onClick={() => setPage((old) => (!data.data.rows ? old : old + 1))}
            disabled={!data.data.rows || data?.data?.total_rows < page * 10}
          >
            Next page
          </button>
          <div>
            {data?.data?.rows.map((user, key) => (
              <User key={key} user={user} />
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
      <Users />
    </QueryClientProvider>
  );
}
