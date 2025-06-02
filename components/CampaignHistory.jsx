"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ArrowLeft } from "lucide-react"

export default function CampaignHistory({ campaigns }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showDeliveryLogs, setShowDeliveryLogs] = useState(false)

  // Mock delivery logs data
  const mockDeliveryLogs = [
    {
      userId: "CUST001",
      message: "Welcome to our store! Enjoy 10% off your next purchase.",
      sentStatus: "delivered",
      sentAt: "2024-01-15 10:30:00",
    },
    {
      userId: "CUST002",
      message: "Welcome to our store! Enjoy 10% off your next purchase.",
      sentStatus: "delivered",
      sentAt: "2024-01-15 10:31:00",
    },
    {
      userId: "CUST003",
      message: "Welcome to our store! Enjoy 10% off your next purchase.",
      sentStatus: "failed",
      sentAt: "2024-01-15 10:32:00",
    },
    {
      userId: "CUST004",
      message: "Welcome to our store! Enjoy 10% off your next purchase.",
      sentStatus: "delivered",
      sentAt: "2024-01-15 10:33:00",
    },
  ]

  const viewDeliveryLogs = (campaign) => {
    setSelectedCampaign(campaign)
    setShowDeliveryLogs(true)
  }

  const backToCampaigns = () => {
    setShowDeliveryLogs(false)
    setSelectedCampaign(null)
  }

  const getStatusBadge = (status) => {
    const variants = {
      completed: "default",
      draft: "secondary",
      sending: "outline",
    }
    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const getDeliveryStatusBadge = (status) => {
    const variants = {
      delivered: "default",
      failed: "destructive",
      pending: "secondary",
    }
    return <Badge variant={variants[status] || "secondary"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const getSuccessRate = (sent, failed) => {
    if (sent + failed === 0) return "N/A"
    const rate = (sent / (sent + failed)) * 100
    return `${rate.toFixed(1)}%`
  }

  const formatRulesSummary = (rules) => {
    if (!rules || rules.length === 0) return "No rules defined"

    return rules
      .map((rule, index) => {
        const logic = index < rules.length - 1 ? ` ${rule.logic} ` : ""
        return `${rule.field} ${rule.operator} ${rule.value}${logic}`
      })
      .join("")
  }

  if (showDeliveryLogs && selectedCampaign) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={backToCampaigns} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery Logs</h1>
            <p className="text-gray-600">Campaign: {selectedCampaign.name}</p>
          </div>
        </div>

        {/* Campaign Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Audience Size</p>
                <p className="text-2xl font-bold">{selectedCampaign.audienceSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Sent Count</p>
                <p className="text-2xl font-bold text-green-600">{selectedCampaign.sentCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Count</p>
                <p className="text-2xl font-bold text-red-600">{selectedCampaign.failedCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">
                  {getSuccessRate(selectedCampaign.sentCount, selectedCampaign.failedCount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
            <CardDescription>Individual message delivery status for each recipient</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDeliveryLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{log.userId}</TableCell>
                    <TableCell className="max-w-xs truncate" title={log.message}>
                      {log.message}
                    </TableCell>
                    <TableCell>{getDeliveryStatusBadge(log.sentStatus)}</TableCell>
                    <TableCell>{log.sentAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campaign History</h1>
        <p className="text-gray-600">View and analyze your past campaigns</p>
      </div>

      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.sentCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.audienceSize, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign History</CardTitle>
          <CardDescription>All your campaigns and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Segment Rules</TableHead>
                <TableHead>Audience Size</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="max-w-xs truncate" title={formatRulesSummary(campaign.segmentRules)}>
                    {formatRulesSummary(campaign.segmentRules)}
                  </TableCell>
                  <TableCell>{campaign.audienceSize}</TableCell>
                  <TableCell>{campaign.sentCount}</TableCell>
                  <TableCell>{campaign.failedCount}</TableCell>
                  <TableCell>{getSuccessRate(campaign.sentCount, campaign.failedCount)}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewDeliveryLogs(campaign)}
                      disabled={campaign.status === "draft"}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Logs
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
