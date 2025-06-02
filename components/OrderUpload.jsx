"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrderUpload({ orders, setOrders, customers }) {
  const [formData, setFormData] = useState({
    customerId: "",
    orderAmount: "",
    orderDate: "",
    items: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOrder = {
      id: orders.length + 1,
      ...formData,
      orderAmount: Number.parseFloat(formData.orderAmount),
    }
    setOrders([...orders, newOrder])
    setFormData({
      customerId: "",
      orderAmount: "",
      orderDate: "",
      items: "",
    })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCustomerSelect = (value) => {
    setFormData({
      ...formData,
      customerId: value,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600">Add and track customer orders</p>
      </div>

      {/* Add Order Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Order</CardTitle>
          <CardDescription>Enter order details to add them to your database</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer</Label>
                <Select value={formData.customerId} onValueChange={handleCustomerSelect} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} ({customer.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderAmount">Order Amount ($)</Label>
                <Input
                  id="orderAmount"
                  name="orderAmount"
                  type="number"
                  step="0.01"
                  value={formData.orderAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  name="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="items">Items</Label>
              <Textarea
                id="items"
                name="items"
                value={formData.items}
                onChange={handleInputChange}
                placeholder="List the items in this order"
                required
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Add Order
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order List */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>All orders in your database</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>${order.orderAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.items}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
