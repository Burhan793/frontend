import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getUserProfile, updateUserProfile } from "../../services/userService"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchUserProfile()
  // eslint-disable-next-line no-use-before-define
  }, [fetchUserProfile])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile()
      setProfile(userProfile)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user profile",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUserProfile(profile)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

