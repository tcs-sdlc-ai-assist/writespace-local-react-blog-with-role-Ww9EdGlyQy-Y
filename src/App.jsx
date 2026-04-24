import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import WriteBlog from './pages/WriteBlog';
import ReadBlog from './pages/ReadBlog';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogs" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/write" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><ReadBlog /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}