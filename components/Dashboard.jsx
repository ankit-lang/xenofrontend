import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, Mail, TrendingUp } from "lucide-react"

export default function Dashboard({ customers, orders, campaigns }) {
  const stats = [
    {
      name: "Total Customers",
      value: customers.length.toString(),
      icon: Users,
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
      change: "+8%",
      changeType: "increase",
    },
    {
      name: "Total Campaigns",
      value: campaigns.length.toString(),
      icon: Mail,
      change: "+3%",
      changeType: "increase",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Track your campaign engagement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Campaign performance chart will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
