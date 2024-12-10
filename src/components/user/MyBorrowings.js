import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { getUserBorrowings, returnBook } from "../../services/borrowingService"

export default function MyBorrowings() {
  const [borrowings, setBorrowings] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchBorrowings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchBorrowings = async () => {
    try {
      const fetchedBorrowings = await getUserBorrowings()
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
      await returnBook(borrowingId)
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Borrowings</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowings.map((borrowing) => (
            <TableRow key={borrowing._id}>
              <TableCell>{borrowing.book.title}</TableCell>
              <TableCell>{new Date(borrowing.borrowDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(borrowing.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{borrowing.status}</TableCell>
              <TableCell>
                {borrowing.status === "borrowed" && (
                  <Button onClick={() => handleReturn(borrowing._id)}>Return</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

