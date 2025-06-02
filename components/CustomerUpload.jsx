"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CustomerUpload({ customers, setCustomers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalSpent: "",
    visits: "",
    lastOrderDate: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCustomer = {
      id: `CUST${String(customers.length + 1).padStart(3, "0")}`,
      ...formData,
      totalSpent: Number.parseFloat(formData.totalSpent),
      visits: Number.parseInt(formData.visits),
    }
    setCustomers([...customers, newCustomer])
    await fetch('http://localhost:5000/api/custumer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customers)
    });
    setFormData({
      name: "",
      email: "",
      totalSpent: "",
      visits: "",
      lastOrderDate: "",
    })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-gray-600">Add and manage your customer database</p>
      </div>

      {/* Add Customer Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
          <CardDescription>Enter customer details to add them to your database</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalSpent">Total Spent ($)</Label>
                <Input
                  id="totalSpent"
                  name="totalSpent"
                  type="number"
                  step="0.01"
                  value={formData.totalSpent}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visits">Visits</Label>
                <Input
                  id="visits"
                  name="visits"
                  type="number"
                  value={formData.visits}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastOrderDate">Last Order Date</Label>
                <Input
                  id="lastOrderDate"
                  name="lastOrderDate"
                  type="date"
                  value={formData.lastOrderDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Add Customer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>All customers in your database</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{customer.lastOrderDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
