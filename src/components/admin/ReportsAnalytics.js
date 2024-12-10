import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getReports } from "../../services/reportService"

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState("borrowing")
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    fetchReportData()
  }, [reportType])

  const fetchReportData = async () => {
    try {
      const data = await getReports(reportType)
      setReportData(data)
    } catch (error) {
      console.error("Error fetching report data:", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports and Analytics</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Select Report Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="borrowing">Borrowing Trends</SelectItem>
              <SelectItem value="overdue">Overdue Reports</SelectItem>
              <SelectItem value="activity">User Activity</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{reportType === "borrowing" ? "Borrowing Trends" : reportType === "overdue" ? "Overdue Reports" : "User Activity"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

