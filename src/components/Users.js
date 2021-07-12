import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Pagination } from "antd";
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

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <h2>Users</h2>
      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching</div>}
      {status === "success" && (
        <>
          <Pagination
            defaultCurrent={page}
            total={data?.data?.total_rows}
            onChange={onChange}
          />
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
