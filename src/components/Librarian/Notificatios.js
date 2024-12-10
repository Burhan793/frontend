import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getNotifications, sendNotification } from "../../services/notificationService"

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchNotifications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await getNotifications()
      setNotifications(fetchedNotifications)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive",
      })
    }
  }

  const handleSendNotification = async (type) => {
    try {
      await sendNotification(type)
      fetchNotifications()
      toast({
        title: "Success",
        description: "Notifications sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notifications",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Due Date Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleSendNotification("dueDate")}>Send Reminders</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Send Overdue Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleSendNotification("overdue")}>Send Notifications</Button>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
      {notifications.map((notification) => (
        <Card key={notification._id} className="mb-4">
          <CardHeader>
            <CardTitle>{notification.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Sent on: {new Date(notification.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

