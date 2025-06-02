"use client"

import { useEffect, useState } from "react"
import LoginPage from "../components/LoginPage"
import DashboardLayout from "../components/DashboardLayout"
import Dashboard from "../components/Dashboard"
import CustomerUpload from "../components/CustomerUpload"
import OrderUpload from "../components/OrderUpload"
import CreateCampaign from "../components/CreateCampaign"
import CampaignHistory from "../components/CampaignHistory"

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../components/firebaseConfig";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();


      console.log("Firebase ID Token:", token);

      // OPTIONAL: Send token to backend for verification
      localStorage.setItem("token", JSON.stringify({ token }));
      console.log(token);
      useEffect(() => {


        <Dashboard customers={customers} orders={orders} campaigns={campaigns} />
      }, [])

    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const [currentPage, setCurrentPage] = useState("dashboard")

  // Mock data that will be shared across components
  const [customers, setCustomers] = useState([
    {
      id: "CUST001",
      name: "John Doe",
      email: "john@example.com",
      totalSpent: 1250.0,
      visits: 15,
      lastOrderDate: "2024-01-15",
    },
    {
      id: "CUST002",
      name: "Jane Smith",
      email: "jane@example.com",
      totalSpent: 890.5,
      visits: 8,
      lastOrderDate: "2024-01-10",
    },
    {
      id: "CUST003",
      name: "Bob Johnson",
      email: "bob@example.com",
      totalSpent: 2100.0,
      visits: 25,
      lastOrderDate: "2024-01-20",
    },
    {
      id: "CUST004",
      name: "Alice Brown",
      email: "alice@example.com",
      totalSpent: 450.0,
      visits: 5,
      lastOrderDate: "2023-12-15",
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerId: "CUST001",
      orderAmount: 125.99,
      orderDate: "2024-01-15",
      items: "Product A, Product B",
    },
    {
      id: 2,
      customerId: "CUST002",
      orderAmount: 89.5,
      orderDate: "2024-01-14",
      items: "Product C",
    },
  ])

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Welcome New Customers",
      message: "Welcome to our store! Enjoy 10% off your next purchase.",
      segmentRules: [
        { field: "visits", operator: "=", value: "1", logic: "AND" },
        { field: "total_spent", operator: ">", value: "0", logic: "" },
      ],
      audienceSize: 245,
      sentCount: 240,
      failedCount: 5,
      createdAt: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      name: "High Value Customer Retention",
      message: "Thank you for being a valued customer! Here's an exclusive offer just for you.",
      segmentRules: [
        { field: "total_spent", operator: ">", value: "500", logic: "AND" },
        { field: "visits", operator: ">=", value: "10", logic: "" },
      ],
      audienceSize: 89,
      sentCount: 85,
      failedCount: 4,
      createdAt: "2024-01-10",
      status: "completed",
    },
  ])



  const handleLogout = () => {
    // setIsLoggedIn(false)
    setCurrentPage("dashboard")
    localStorage.setItem("token", "");
    useEffect(() => {

      < LoginPage onLogin={handleLogin} />
    }, [])

  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard customers={customers} orders={orders} campaigns={campaigns} />
      case "customers":
        return <CustomerUpload customers={customers} setCustomers={setCustomers} />
      case "orders":
        return <OrderUpload orders={orders} setOrders={setOrders} customers={customers} />
      case "create-campaign":
        return <CreateCampaign customers={customers} campaigns={campaigns} setCampaigns={setCampaigns} />
      case "campaign-history":
        return <CampaignHistory campaigns={campaigns} />
      default:
        return <Dashboard customers={customers} orders={orders} campaigns={campaigns} />
    }
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="relative h-full w-full z-10">
      <div className="absolute top-0 left-0 w-full h-full ">
        <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout}>
          <SmoothCursor />
          <ScrollProgress />
          <InteractiveGridPattern />
          {renderPage()}
        </DashboardLayout>
      </div>
    </div >
  )
}
