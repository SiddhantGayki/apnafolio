// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminEditUserModal from "../../components/AdminEditUserModal";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import "../../styles/Admin.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [stats, setStats] = useState({ totalUsers: 0, paidUsers: 0, revenue: 0, networth: 0 });
  const [userChart, setUserChart] = useState([]);
  const [earningChart, setEarningChart] = useState([]);


  const fetchUsers = async (p = 1, s = "") => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", { params: { page: p, limit, search: s } });
      if (res.data?.success) {
        setUsers(res.data.users || []);
        setTotal(res.data.total || 0);
      } else {
        setUsers([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("fetchUsers err", err);
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      if (res.data?.success) {
        setStats(res.data.stats);
        setUserChart(res.data.userChart);
        setEarningChart(res.data.earningChart);
      }
    } catch (err) {
      console.error("fetchStats err", err);
    }
  };

  useEffect(() => {
    fetchUsers(page, search);
  }, [page]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, search);
  };

  const openEdit = (user) => setEditingUser(user);
  const onModalClose = (updated) => {
    setEditingUser(null);
    if (updated) {
      fetchUsers(page, search);
      fetchStats();
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const grantTemplate = async (userId, template) => {
    try {
      await api.post("/admin/update-user", { userId, paid: true, selectedTemplate: template });
      alert("Template granted successfully");
      fetchUsers(page, search);
      fetchStats();
    } catch (err) {
      alert("Error while granting");
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await api.delete(`/admin/user/${userId}`);
      alert("User deleted");
      fetchUsers(page, search);
      fetchStats();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  const toggleAdmin = async (userId, current) => {
    try {
      await api.post("/admin/update-user", { userId, isAdmin: !current });
      alert("Role updated");
      fetchUsers(page, search);
    } catch (err) {
      alert("Error updating role");
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      {/* Summary Cards */}
      <div className="admin-summary-cards">
        <div className="card">Total Users: {stats.totalUsers}</div>
        <div className="card">Paid Users: {stats.paidUsers}</div>
        <div className="card">Revenue: ₹{stats.revenue}</div>
        <div className="card">Net Worth: ₹{stats.networth}</div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-box">
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#333" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#00d9ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-box">
          <h3>Earnings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#333" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00ff88" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="admin-search">
        <input placeholder="Search by name, email or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
        <button type="button" onClick={() => { setSearch(""); fetchUsers(1, ""); }}>Reset</button>
      </form>

      {/* Users Grid */}
      {loading ? <p>Loading...</p> : (
        <div className="admin-grid">
          {users.map(u => (
            <div key={u._id} className="admin-card">
              <div className="admin-card-top">
                <div className="admin-name">{u.name || "—"}</div>
                <div className="admin-email">{u.email}</div>
              </div>

              <div className="admin-meta">
                <div>Username: {u.username || "-"}</div>
                <div>Paid: {u.paid ? "✅" : "❌"}</div>
                <div>Template: {u.selectedTemplate || "-"}</div>
                <div>Admin: {u.isAdmin ? "✅" : "❌"}</div>
              </div>

              <div className="admin-actions">
                <button onClick={() => openEdit(u)}>Edit</button>

                {/* Template dropdown */}
                <select onChange={(e) => grantTemplate(u._id, e.target.value)} defaultValue="">
                  <option value="" disabled>Grant Template</option>
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                  <option value="template3">Template 3</option>
                  <option value="template4">Template 4</option>
                  <option value="template5">Template 5</option>
                  <option value="template6">Template 6</option>
                  <option value="template7">Template 7</option>
                  <option value="template8">Template 8</option>
                  <option value="template9">Template 9</option>
                  <option value="template10">Template 10</option>
                  <option value="template11">Template 11</option>
                </select>


                <button onClick={() => toggleAdmin(u._id, u.isAdmin)}>
                  {u.isAdmin ? "Revoke Admin" : "Make Admin"}
                </button>

                <button onClick={() => deleteUser(u._id)} style={{ background: "red", color: "#fff" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="admin-pagination">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <span>{page}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
      </div>

      {editingUser && <AdminEditUserModal user={editingUser} onClose={onModalClose} />}
    </div>
  );
}
