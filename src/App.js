import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import AdminPanel from "./components/admin/AdminPanel"
import LibrarianPanel from "./components/librarian/LibrarianPanel"
import UserPanel from "./components/user/UserPanel"
import Login from "./components/auth/Login"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/librarian/*"
              element={
                <ProtectedRoute role="librarian">
                  <LibrarianPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/*"
              element={
                <ProtectedRoute role="user">
                  <UserPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

