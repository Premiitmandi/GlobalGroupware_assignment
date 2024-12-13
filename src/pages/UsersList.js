import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null); 
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedFirstName(user.first_name);
    setUpdatedLastName(user.last_name);
    setUpdatedEmail(user.email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail };
    
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, updatedUser);
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null); 
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-list">
      <h2>Users List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="users">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <h3>{user.first_name} {user.last_name}</h3>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <button onClick={() => handleEdit(user)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
            />
            <input
              type="text"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
