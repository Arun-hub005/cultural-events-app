import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';

import AdminLayout from './components/AdminLayout';
import StudentLayout from './components/StudentLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminManageEvents from './pages/admin/ManageEvents';
import AdminManageUsers from './pages/admin/ManageUsers';
import StudentDashboard from './pages/student/Dashboard';
import StudentMyTickets from './pages/student/MyTickets';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute roleRequired="admin"><AdminLayout><AdminManageEvents /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roleRequired="admin"><AdminLayout><AdminManageUsers /></AdminLayout></ProtectedRoute>} />

      {/* Student Routes */}
      <Route path="/" element={<ProtectedRoute roleRequired="student"><StudentLayout><StudentDashboard /></StudentLayout></ProtectedRoute>} />
      <Route path="/tickets" element={<ProtectedRoute roleRequired="student"><StudentLayout><StudentMyTickets /></StudentLayout></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
