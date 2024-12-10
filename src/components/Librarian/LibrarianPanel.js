import React from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "../../contexts/AuthContext"
import BookManagement from "./BookManagement"
import BorrowingManagement from "./BorrowingManagement"
import Notifications from "./Notifications"

export default function LibrarianPanel() {
  const { logout } = useAuth()

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 bg-gray-100">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Librarian Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/librarian/books">Book Management</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/librarian/borrowing">Borrowing Management</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/librarian/notifications">Notifications</a>
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
          <Route path="/books" element={<BookManagement />} />
          <Route path="/borrowing" element={<BorrowingManagement />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
    </div>
  )
}

