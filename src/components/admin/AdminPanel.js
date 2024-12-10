import React from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../contexts/AuthContext"
import Dashboard from "./Dashboard"
import BookManagement from "./BookManagement"
import UserManagement from "./UserManagement"
import ReportsAnalytics from "./ReportsAnalytics"
import SystemConfiguration from "./SystemConfiguration"

export default function AdminPanel() {
  const { logout } = useAuth()

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 bg-gray-100">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/admin">Dashboard</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/admin/books">Book Management</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/admin/users">User Management</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/admin/reports">Reports & Analytics</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/admin/config">System Configuration</a>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button onClick={logout} variant="outline" className="w-full">
            Logout
          </Button>
        </div>
      </Sidebar>
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BookManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/config" element={<SystemConfiguration />} />
        </Routes>
      </main>
    </div>
  )
}

