import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getBookDetails, addReview, borrowBook } from "../../services/bookService"

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    fetchBookDetails()
  // eslint-disable-next-line no-use-before-define
  }, [fetchBookDetails, id])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBookDetails = async () => {
    try {
      const bookDetails = await getBookDetails(id)
      setBook(bookDetails)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch book details",
        variant: "destructive",
      })
    }
  }

  const handleAddReview = async () => {
    try {
      await addReview(id, { review, rating })
      fetchBookDetails()
      setReview("")
      setRating(0)
      toast({
        title: "Success",
        description: "Review added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add review",
        variant: "destructive",
      })
    }
  }

  const handleBorrow = async () => {
    try {
      await borrowBook(id)
      fetchBookDetails()
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      })
    }
  }

  if (!book) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Available:</strong> {book.available}</p>
          <Button onClick={handleBorrow} disabled={book.available === 0} className="mt-4">
            {book.available === 0 ? "Unavailable" : "Borrow"}
          </Button>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {book.reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.review}</p>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="mb-2"
            />
            <Button onClick={handleAddReview}>Submit Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

