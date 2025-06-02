"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Users, ShoppingCart, Plus, History, Menu, LogOut } from "lucide-react"

export default function DashboardLayout({ children, currentPage, setCurrentPage, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "dashboard", icon: LayoutDashboard },
    { name: "Customers", href: "customers", icon: Users },
    { name: "Orders", href: "orders", icon: ShoppingCart },
    { name: "Create Campaign", href: "create-campaign", icon: Plus },
    { name: "Campaign History", href: "campaign-history", icon: History },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                <h1 className="text-xl font-bold text-gray-900">EngagePro</h1>
              </div>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "block" : "hidden"} lg:block lg:w-64 bg-white shadow-sm border-r min-h-screen`}
        >
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Button
                      variant={currentPage === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setCurrentPage(item.href)
                        setSidebarOpen(false)
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  )
}
