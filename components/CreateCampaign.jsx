"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Sparkles, Users, Eye } from "lucide-react"

export default function CreateCampaign({ customers, campaigns, setCampaigns }) {
  const [campaignName, setCampaignName] = useState("")
  const [campaignMessage, setCampaignMessage] = useState("")
  const [rules, setRules] = useState([
    {
      id: 1,
      field: "",
      operator: "",
      value: "",
      logic: "AND",
    },
  ])
  const [previewAudience, setPreviewAudience] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  const fieldOptions = [
    { value: "total_spent", label: "Total Spent", type: "number" },
    { value: "visits", label: "Visits", type: "number" },
    { value: "last_order_date", label: "Last Order Date", type: "date" },
    { value: "email", label: "Email", type: "text" },
    { value: "name", label: "Name", type: "text" },
  ]

  const operatorOptions = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: "=", label: "Equal to" },
    { value: ">=", label: "Greater than or equal" },
    { value: "<=", label: "Less than or equal" },
    { value: "!=", label: "Not equal to" },
    { value: "contains", label: "Contains" },
  ]

  const addRule = () => {
    const newRule = {
      id: Date.now(),
      field: "",
      operator: "",
      value: "",
      logic: "AND",
    }
    setRules([...rules, newRule])
  }

  const removeRule = (id) => {
    if (rules.length > 1) {
      setRules(rules.filter((rule) => rule.id !== id))
    }
  }

  const updateRule = (id, field, value) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)))
  }

  const getFieldType = (fieldValue) => {
    const field = fieldOptions.find((f) => f.value === fieldValue)
    return field ? field.type : "text"
  }

  const evaluateRule = (customer, rule) => {
    if (!rule.field || !rule.operator || rule.value === "") return true

    let customerValue = customer[rule.field]
    let ruleValue = rule.value

    // Convert values based on field type
    const fieldType = getFieldType(rule.field)
    if (fieldType === "number") {
      customerValue = Number.parseFloat(customerValue)
      ruleValue = Number.parseFloat(ruleValue)
    } else if (fieldType === "date") {
      customerValue = new Date(customerValue)
      ruleValue = new Date(ruleValue)
    }

    switch (rule.operator) {
      case ">":
        return customerValue > ruleValue
      case "<":
        return customerValue < ruleValue
      case "=":
        return customerValue === ruleValue
      case ">=":
        return customerValue >= ruleValue
      case "<=":
        return customerValue <= ruleValue
      case "!=":
        return customerValue !== ruleValue
      case "contains":
        return String(customerValue).toLowerCase().includes(String(ruleValue).toLowerCase())
      default:
        return true
    }
  }

  const previewAudienceHandler = () => {
    // Filter customers based on rules
    const matchedCustomers = customers.filter((customer) => {
      let result = true

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const ruleResult = evaluateRule(customer, rule)

        if (i === 0) {
          result = ruleResult
        } else {
          const prevRule = rules[i - 1]
          if (prevRule.logic === "AND") {
            result = result && ruleResult
          } else if (prevRule.logic === "OR") {
            result = result || ruleResult
          }
        }
      }

      return result
    })

    setPreviewAudience(matchedCustomers)
    setShowPreview(true)
  }

  const generateAIRules = () => {
    // Simulate AI generation with different rule combinations
    const aiRuleSets = [
      [
        { id: Date.now(), field: "total_spent", operator: ">", value: "100", logic: "AND" },
        { id: Date.now() + 1, field: "visits", operator: ">=", value: "5", logic: "" },
      ],
      [
        { id: Date.now(), field: "last_order_date", operator: "<", value: "2024-01-01", logic: "OR" },
        { id: Date.now() + 1, field: "total_spent", operator: ">", value: "500", logic: "" },
      ],
      [
        { id: Date.now(), field: "visits", operator: "=", value: "1", logic: "AND" },
        { id: Date.now() + 1, field: "total_spent", operator: ">", value: "0", logic: "" },
      ],
    ]

    const randomRuleSet = aiRuleSets[Math.floor(Math.random() * aiRuleSets.length)]
    setRules(randomRuleSet)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Calculate audience size based on current rules
    const matchedCustomers = customers.filter((customer) => {
      let result = true

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const ruleResult = evaluateRule(customer, rule)

        if (i === 0) {
          result = ruleResult
        } else {
          const prevRule = rules[i - 1]
          if (prevRule.logic === "AND") {
            result = result && ruleResult
          } else if (prevRule.logic === "OR") {
            result = result || ruleResult
          }
        }
      }

      return result
    })

    const newCampaign = {
      id: campaigns.length + 1,
      name: campaignName,
      message: campaignMessage,
      segmentRules: rules.filter((rule) => rule.field && rule.operator && rule.value),
      audienceSize: matchedCustomers.length,
      sentCount: 0,
      failedCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "draft",
    }

    setCampaigns([...campaigns, newCampaign])

    // Reset form
    setCampaignName("")
    setCampaignMessage("")
    setRules([{ id: 1, field: "", operator: "", value: "", logic: "AND" }])
    setPreviewAudience(null)
    setShowPreview(false)
  }

  const formatRulesSummary = (rules) => {
    return rules
      .filter((rule) => rule.field && rule.operator && rule.value)
      .map((rule, index) => {
        const field = fieldOptions.find((f) => f.value === rule.field)?.label || rule.field
        const operator = operatorOptions.find((o) => o.value === rule.operator)?.label || rule.operator
        const logic = index < rules.length - 1 ? ` ${rule.logic} ` : ""
        return `${field} ${operator} ${rule.value}${logic}`
      })
      .join("")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
        <p className="text-gray-600">Design targeted campaigns for your customers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Details */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Set up your campaign name and message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaignMessage">Campaign Message</Label>
              <Textarea
                id="campaignMessage"
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                placeholder="Write your campaign message here..."
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Segment Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Segment Builder</CardTitle>
            <CardDescription>Define rules to target specific customer segments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Targeting Rules</h3>
              <Button type="button" variant="outline" onClick={generateAIRules} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Rules from AI
              </Button>
            </div>

            {rules.map((rule, index) => (
              <div key={rule.id} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Field</Label>
                    <Select value={rule.field} onValueChange={(value) => updateRule(rule.id, "field", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <Select value={rule.operator} onValueChange={(value) => updateRule(rule.id, "operator", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {operatorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      type={getFieldType(rule.field)}
                      value={rule.value}
                      onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Logic</Label>
                    <div className="flex items-center gap-2">
                      <Select
                        value={rule.logic}
                        onValueChange={(value) => updateRule(rule.id, "logic", value)}
                        disabled={index === rules.length - 1}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AND">AND</SelectItem>
                          <SelectItem value="OR">OR</SelectItem>
                        </SelectContent>
                      </Select>
                      {rules.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeRule(rule.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={addRule} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={previewAudienceHandler}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview Audience
              </Button>
            </div>

            {/* Rules Summary */}
            {rules.some((rule) => rule.field && rule.operator && rule.value) && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Rules Summary:</p>
                <p className="text-sm text-gray-600">{formatRulesSummary(rules)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Audience */}
        {showPreview && previewAudience && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Audience Preview
              </CardTitle>
              <CardDescription>{previewAudience.length} customers match your targeting rules</CardDescription>
            </CardHeader>
            <CardContent>
              {previewAudience.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Visits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewAudience.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>{customer.visits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No customers match your current targeting rules</p>
                  <p className="text-sm">Try adjusting your criteria to reach more customers</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full md:w-auto">
          Create Campaign
        </Button>
      </form>
    </div>
  )
}
