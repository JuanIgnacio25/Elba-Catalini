"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await axios.get("/api/users");
        console.log(users.data.users);
        
        setUsers(users.data.users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="h-72">
        <div className="px-1 my-4">Cargando...</div>
      </div>
    );

  return (
    <div className="flex flex-col my-4 mx-2 gap-2">
      {users.map((user) => (
        <div className="flex flex-row gap-2" key={user.userId}>
          <p className="text-blue-700">{user.companyName}</p>
          {"|"}
          <p>{user.location}</p>
          {"|"}
          <p>{user.address}</p>
          {"|"}
          <p>{user.carrier}</p>
          {"|"}
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
