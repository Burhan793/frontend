import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getSystemConfig, updateSystemConfig } from "../../services/configService"

export default function SystemConfiguration() {
  const [config, setConfig] = useState({
    borrowingLimit: 0,
    borrowingDuration: 0,
    lateFee: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchSystemConfig()
  }, [])

  const fetchSystemConfig = async () => {
    try {
      const configData = await getSystemConfig()
      setConfig(configData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch system configuration",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: parseFloat(value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateSystemConfig(config)
      toast({
        title: "Success",
        description: "System configuration updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update system configuration",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">System Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Library Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="borrowingLimit" className="block text-sm font-medium text-gray-700">
                Borrowing Limit
              </label>
              <Input
                type="number"
                id="borrowingLimit"
                name="borrowingLimit"
                value={config.borrowingLimit}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div>
              <label htmlFor="borrowingDuration" className="block text-sm font-medium text-gray-700">
                Borrowing Duration (days)
              </label>
              <Input
                type="number"
                id="borrowingDuration"
                name="borrowingDuration"
                value={config.borrowingDuration}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="lateFee" className="block text-sm font-medium text-gray-700">
                Late Fee (per day)
              </label>
              <Input
                type="number"
                id="lateFee"
                name="lateFee"
                value={config.lateFee}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <Button type="submit">Update Configuration</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

