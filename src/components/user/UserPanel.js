import React from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../contexts/AuthContext"
import BookSearch from "./BookSearch"
import BookDetails from "./BookDetails"
import MyBorrowings from "./MyBorrowings"
import Profile from "./Profile"

export default function UserPanel() {
  const { logout } = useAuth()

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 bg-gray-100">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">User Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/user/search">Search Books</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/user/borrowings">My Borrowings</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/user/profile">Profile</a>
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
          <Route path="/search" element={<BookSearch />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/borrowings" element={<MyBorrowings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

