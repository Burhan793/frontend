import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { searchBooks } from "../../services/bookService"

export default function BookSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const { toast } = useToast()

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const results = await searchBooks(searchQuery)
      setSearchResults(results)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search books",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Books</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((book) => (
          <Card key={book._id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Available: {book.available}</p>
              <Link to={`/user/books/${book._id}`}>
                <Button className="mt-2">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

