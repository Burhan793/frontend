"use client";

const { useState, useEffect } = require("react");
const { Button } = require("../../components/ui/button");
const { Input } = require("../../components/ui/input");
const {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} = require("../../components/ui/table");
const { useToast } = require("../../components/ui/use-toast");
const {
  getAvailableBooks,
  borrowBook,
  returnBook,
  getBorrowedBooks,
} = require("../../services/borrowingService");

function BookBorrowing() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBooks();
  // eslint-disable-next-line no-use-before-define
  }, [fetchBooks]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBooks = async () => {
    try {
      const [available, borrowed] = await Promise.all([
        getAvailableBooks(),
        getBorrowedBooks(),
      ]);
      setAvailableBooks(available);
      setBorrowedBooks(borrowed);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      });
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await borrowBook(bookId);
      fetchBooks();
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      });
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId);
      fetchBooks();
      toast({
        title: "Success",
        description: "Book returned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to return book",
        variant: "destructive",
      });
    }
  };

  const filteredBooks = availableBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Borrowing</h1>
      <Input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Available Books</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.available}</TableCell>
              <TableCell>
                <Button onClick={() => handleBorrow(book._id)}>Borrow</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-xl font-semibold my-4">Borrowed Books</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowedBooks.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{new Date(book.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button onClick={() => handleReturn(book._id)}>Return</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

module.exports = BookBorrowing;
