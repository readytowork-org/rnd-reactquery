import React, { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "react-query";
import { Pagination, Input } from "antd";
import User from "./User";
import axios from "axios";
const queryClient = new QueryClient();

const fetchUsers = async ({ queryKey }) => {
  const [key, page, keyword] = queryKey;
  const res = await fetch(
    `http://localhost:8000/user/?page=${page}&keyword=${keyword}`
  );
  return res.json();
};

const Users = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data, status, refetch } = useQuery(
    ["users", page, keyword],
    fetchUsers,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const blockkublock = async (id, operation) => {
    await axios.post(`http://localhost:8000/user/update/${id}`, {
      status: operation,
    });
    refetch();
  };

  const { status: mutationStatus } = useMutation(blockkublock, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });

  console.log(data?.data?.rows, "here is data");
  const { Search } = Input;

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onSearch = async (value) => {
    setKeyword(value);
  };

  return (
    <div>
      <h2>Users ({data?.data?.total_rows})</h2>
      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching</div>}
      {status === "success" && (
        <>
          <Search
            placeholder="search..."
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <br />
          <br />
          <Pagination
            defaultCurrent={page}
            total={data?.data?.total_rows}
            onChange={onChange}
          />
          <div>
            {data?.data?.rows.map((user, key) => (
              <User
                key={key}
                user={user}
                blockkublock={blockkublock}
                mutationStatus={mutationStatus}
                // onSubmitBlock={onSubmitBlock}
              />
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
