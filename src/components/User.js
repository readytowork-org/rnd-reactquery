import React from "react";

const User = ({ user }) => {
  return (
    <div className="card">
      <h3>{user?.name}</h3>
      <p>Email - {user?.email}</p>
      <p>Mobile - {user?.mobile}</p>
    </div>
  );
};

export default User;
