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












// import React, { useEffect, useState } from "react";
// import api from "../../utils/api";
// import AdminEditUserModal from "../../components/AdminEditUserModal";
// import {
//   BarChart, Bar, LineChart, Line,
//   XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
// } from "recharts";
// import "../../styles/Admin.css";

// export default function AdminDashboard() {

//   /* ================= STATES ================= */

//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState({});
//   const [userChart, setUserChart] = useState([]);
//   const [earningChart, setEarningChart] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all"); // paid/unpaid filter
//   const [loading, setLoading] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState(null);

//   const limit = 12;

//   /* ================= FETCH USERS ================= */

//   const fetchUsers = async (p = 1) => {
//     setLoading(true);
//     try {
//       const res = await api.get("/admin/users", {
//         params: { page: p, limit, search, filter }
//       });

//       if (res.data?.success) {
//         setUsers(res.data.users || []);
//         setTotal(res.data.total || 0);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= FETCH STATS ================= */

//   const fetchStats = async () => {
//     try {
//       const res = await api.get("/admin/stats");
//       if (res.data?.success) {
//         setStats(res.data.stats);
//         setUserChart(res.data.userChart || []);
//         setEarningChart(res.data.earningChart || []);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchUsers(page); }, [page, filter]);
//   useEffect(() => { fetchStats(); }, []);

//   const totalPages = Math.max(1, Math.ceil(total / limit));

//   /* ================= ACTIONS ================= */

//   const updateUser = async (userId, payload) => {
//     try {
//       setActionLoading(userId);
//       await api.post("/admin/update-user", { userId, ...payload });
//       fetchUsers(page);
//       fetchStats();
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const suspendUser = (u) => updateUser(u._id, { suspended: !u.suspended });
//   const extendPlan = (u) => updateUser(u._id, { extendYear: true });
//   const addCredits = (u) => updateUser(u._id, { addCredits: 3 });

//   /* ================= COUPON SECTION ================= */

//   const createCoupon = async () => {
//     const code = prompt("Enter Coupon Code:");
//     const discount = prompt("Enter Discount %:");

//     if (!code || !discount) return;

//     await api.post("/admin/create-coupon", {
//       code,
//       discount: Number(discount)
//     });

//     alert("Coupon Created");
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="admin-page">

//       <h1>Admin Control Center</h1>

//       {/* SUMMARY */}
//       <div className="admin-summary-cards">
//         <div className="card">Users: {stats.totalUsers || 0}</div>
//         <div className="card">Paid: {stats.paidUsers || 0}</div>
//         <div className="card">Revenue: ₹{stats.revenue || 0}</div>
//         <div className="card">Net: ₹{stats.networth || 0}</div>
//         <div className="card">Storage: {stats.totalStorageMB} MB</div>
//         <div className="card">Total Credits: {stats.totalCredits}</div>

//       </div>

//       {/* CHARTS */}
//       <div className="charts-row">

//         <div className="chart-box">
//           <h3>User Growth</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={userChart}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <CartesianGrid stroke="#333" />
//               <Tooltip />
//               <Line type="monotone" dataKey="users" stroke="#00d9ff" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-box">
//           <h3>Revenue (98% Net)</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={earningChart}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <CartesianGrid stroke="#333" />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#22c55e" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//       {/* FILTERS */}
//       <div className="admin-filters">
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("paid")}>Paid</button>
//         <button onClick={() => setFilter("unpaid")}>Unpaid</button>
//         <button onClick={createCoupon}>+ Create Coupon</button>
//       </div>

//       {/* USERS */}
//       {loading ? <p>Loading...</p> : (
//         <div className="admin-grid">
//           {users.map((u) => (
//             <div key={u._id} className="admin-card">

//               <div className="admin-header">
//                 <div>
//                   <strong>{u.name}</strong>
//                   <p>{u.email}</p>
//                 </div>
//                 <span className={`badge ${u.paid ? "paid" : "free"}`}>
//                   {u.paid ? "PAID" : "FREE"}
//                 </span>
//               </div>

//               <div className="admin-info">
//                 <div>Username: {u.username}</div>
//                 <div>Template: {u.selectedTemplate || "-"}</div>
//                 <div>Credits: {u.editCredits ?? 0}</div>
//                 <div>Expiry: {u.planExpiry ? new Date(u.planExpiry).toLocaleDateString() : "-"}</div>
//                 <div>Views: {u.analytics?.views || 0}</div>
//                 <div>Status: {u.suspended ? "🚫 Suspended" : "Active"}</div>

//                 {/* S3 STORAGE */}
//                 <div className="s3-box">
//                   <strong>S3 Storage</strong>
//                   <div>Photo: {u.contact?.photo ? "Uploaded" : "No"}</div>
//                   <div>Resume: {u.resumeFile ? "Uploaded" : "No"}</div>
//                   {/* <div>Projects: {u.projects?.length || 0}</div> */}
//                 </div>
//               </div>

//               <div className="admin-actions">
//                 <button onClick={() => extendPlan(u)} disabled={actionLoading === u._id}>Extend</button>
//                 <button onClick={() => addCredits(u)} disabled={actionLoading === u._id}>+3 Credits</button>
//                 <button onClick={() => suspendUser(u)} disabled={actionLoading === u._id}>
//                   {u.suspended ? "Unsuspend" : "Suspend"}
//                 </button>
//                 <button onClick={() => setEditingUser(u)}>Edit</button>
//               </div>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* PAGINATION */}
//       <div className="admin-pagination">
//         <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
//         <span>{page}</span>
//         <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
//       </div>

//       {editingUser && (
//         <AdminEditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
//       )}

//     </div>
//   );
// }
