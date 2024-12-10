import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { getBorrowings, updateBorrowing } from "../../services/borrowingService"

export default function BorrowingManagement() {
  const [borrowings, setBorrowings] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchBorrowings()
  // eslint-disable-next-line no-use-before-define
  }, [fetchBorrowings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBorrowings = async () => {
    try {
      const fetchedBorrowings = await getBorrowings()
      setBorrowings(fetchedBorrowings)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch borrowings",
        variant: "destructive",
      })
    }
  }

  const handleReturn = async (borrowingId) => {
    try {
      await updateBorrowing(borrowingId, { status: "returned" })
      fetchBorrowings()
      toast({
        title: "Success",
        description: "Book returned successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to return book",
        variant: "destructive",
      })
    }
  }

  const handleExtend = async (borrowingId) => {
    try {
      await updateBorrowing(borrowingId, { status: "extended" })
      fetchBorrowings()
      toast({
        title: "Success",
        description: "Borrowing period extended successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extend borrowing period",
        variant: "destructive",
      })
    }
  }

  const filteredBorrowings = borrowings.filter(
    (borrowing) =>
      borrowing.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrowing Management</h1>
      <Input
        type="text"
        placeholder="Search by book title or user name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBorrowings.map((borrowing) => (
            <TableRow key={borrowing._id}>
              <TableCell>{borrowing.book.title}</TableCell>
              <TableCell>{borrowing.user.name}</TableCell>
              <TableCell>{new Date(borrowing.borrowDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(borrowing.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{borrowing.status}</TableCell>
              <TableCell>
                {borrowing.status === "borrowed" && (
                  <>
                    <Button onClick={() => handleReturn(borrowing._id)} className="mr-2">
                      Return
                    </Button>
                    <Button onClick={() => handleExtend(borrowing._id)} variant="outline">
                      Extend
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

