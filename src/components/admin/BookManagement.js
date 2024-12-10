import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { searchGoogleBooks, addBook, deleteBook, getBooks } from "../../services/bookService"

export default function BookManagement() {
  const [books, setBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterCategory, setFilterCategory] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks()
      setBooks(fetchedBooks)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      })
    }
  }

  const handleSearch = async () => {
    try {
      const results = await searchGoogleBooks(searchQuery)
      setSearchResults(results)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search books",
        variant: "destructive",
      })
    }
  }

  const handleAddBook = async (book) => {
    try {
      await addBook(book)
      fetchBooks()
      toast({
        title: "Success",
        description: "Book added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      })
    }
  }

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId)
      fetchBooks()
      toast({
        title: "Success",
        description: "Book deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      })
    }
  }

  const sortedAndFilteredBooks = books
    .filter((book) => 
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterCategory === "" || book.category === filterCategory)
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="Fiction">Fiction</SelectItem>
            <SelectItem value="Non-fiction">Non-fiction</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="History">History</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="available">Available</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
        <Button onClick={handleSearch}>Search Google Books</Button>
      </div>
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((book) => (
                <TableRow key={book.googleBooksId}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.authors?.join(", ")}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAddBook(book)}>Add</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Library Books</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredBooks.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>{book.available}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

