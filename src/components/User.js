import React from "react";

const User = ({ user, blockkublock }) => {
  return (
    <div className="card">
      <h3>{user?.name}</h3>
      <p>Email - {user?.email}</p>
      <p>Mobile - {user?.mobile}</p>
      <p>IsActive - {user.is_active ? "YES" : "NO"}</p>
      <button
        onClick={() =>
          blockkublock(user.id, user.is_active ? "block" : "unblock")
        }
      >
        {user.is_active ? "Unblock" : "Block"}
      </button>
    </div>
  );
};

export default User;
