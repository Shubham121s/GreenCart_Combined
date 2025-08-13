"use client"

import { useState, useEffect } from "react"
import { ordersAPI, driversAPI, simulationAPI } from "../services/api"
import KPICard from "../components/KPICard"
import DeliveryChart from "../components/charts/DeliveryChart"
import FuelCostChart from "../components/charts/FuelCostChart"
import {
  CurrencyRupeeIcon,
  ChartBarIcon,
  TruckIcon,
  ShoppingBagIcon,
  ClockIcon,
  PlayIcon,
  SparklesIcon,
  BoltIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProfit: 0,
    efficiencyScore: 0,
    totalOrders: 0,
    activeDrivers: 0,
    onTimeDeliveries: 0,
    lateDeliveries: 0,
    totalFuelCost: 0,
  })
  const [loading, setLoading] = useState(true)
  const [lastSimulation, setLastSimulation] = useState(null)
  const [isRunningSimulation, setIsRunningSimulation] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const [ordersResponse, driversResponse] = await Promise.all([ordersAPI.getAll(), driversAPI.getAll()])

      const orders = ordersResponse.data
      const drivers = driversResponse.data

      const totalOrders = orders.length
      const activeDrivers = drivers.filter((d) => d.isAvailable).length
      const deliveredOrders = orders.filter((o) => o.status === "Delivered" || o.status === "Late")
      const onTimeDeliveries = deliveredOrders.filter((o) => !o.isLate).length
      const lateDeliveries = deliveredOrders.filter((o) => o.isLate).length

      const totalOrderValue = orders.reduce((sum, order) => sum + order.valueRs, 0)
      const efficiencyScore = deliveredOrders.length > 0 ? (onTimeDeliveries / deliveredOrders.length) * 100 : 0

      setDashboardData({
        totalProfit: totalOrderValue * 0.15,
        efficiencyScore: Math.round(efficiencyScore),
        totalOrders,
        activeDrivers,
        onTimeDeliveries,
        lateDeliveries,
        totalFuelCost: totalOrderValue * 0.08,
      })

      const savedSimulation = localStorage.getItem("lastSimulation")
      if (savedSimulation) {
        setLastSimulation(JSON.parse(savedSimulation))
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const runQuickSimulation = async () => {
    try {
      setIsRunningSimulation(true)
      const response = await simulationAPI.run({
        availableDrivers: dashboardData.activeDrivers || 3,
        routeStartTime: "09:00",
        maxHoursPerDay: 8,
      })

      const simulationResults = response.data
      setLastSimulation(simulationResults)
      localStorage.setItem("lastSimulation", JSON.stringify(simulationResults))

      setDashboardData((prev) => ({
        ...prev,
        totalProfit: simulationResults.totalProfit,
        efficiencyScore: simulationResults.efficiencyScore,
        onTimeDeliveries: simulationResults.onTimeDeliveries,
        lateDeliveries: simulationResults.lateDeliveries,
        totalFuelCost: simulationResults.totalFuelCost,
      }))

      toast.success("Simulation completed successfully!")
    } catch (error) {
      console.error("Error running simulation:", error)
      toast.error("Failed to run simulation")
    } finally {
      setIsRunningSimulation(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">GreenCart Dashboard</h1>
                    <p className="text-blue-100 text-lg">Real-time delivery operations & KPI monitoring</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BoltIcon className="w-4 h-4" />
                    <span className="text-sm">Auto-refresh</span>
                  </div>
                </div>
              </div>

              <button
                onClick={runQuickSimulation}
                disabled={isRunningSimulation}
                className="group relative bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-white/30"
              >
                <div className="flex items-center space-x-3">
                  {isRunningSimulation ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  ) : (
                    <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  <span>{isRunningSimulation ? "Running..." : "Run Quick Simulation"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <KPICard
            title="Total Profit"
            value={`₹${dashboardData.totalProfit.toLocaleString()}`}
            icon={CurrencyRupeeIcon}
            color="green"
            trend="up"
            trendValue="12.5%"
          />
          <KPICard
            title="Efficiency Score"
            value={`${dashboardData.efficiencyScore}%`}
            icon={ChartBarIcon}
            color="blue"
            trend={dashboardData.efficiencyScore > 80 ? "up" : "down"}
            trendValue={`${dashboardData.efficiencyScore > 80 ? "+" : "-"}${Math.abs(dashboardData.efficiencyScore - 80)}%`}
          />
          <KPICard title="Active Drivers" value={dashboardData.activeDrivers} icon={TruckIcon} color="primary" />
          <KPICard title="Total Orders" value={dashboardData.totalOrders} icon={ShoppingBagIcon} color="orange" />
          <KPICard
            title="Fuel Cost"
            value={`₹${dashboardData.totalFuelCost.toLocaleString()}`}
            icon={ClockIcon}
            color="red"
          />
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Delivery Performance</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <ChartBarIcon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <DeliveryChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                onTime: [dashboardData.onTimeDeliveries, 15, 18, 12, 20, 16, 14],
                late: [dashboardData.lateDeliveries, 2, 1, 4, 1, 3, 2],
              }}
            />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Fuel Cost Analysis</h3>
              <div className="p-2 bg-orange-100 rounded-lg">
                <ClockIcon className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <FuelCostChart
              data={{
                breakdown: [70, 25, 5],
              }}
            />
          </div>
        </div>

        {/* Enhanced Simulation Results */}
        {lastSimulation && (
          <div className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Latest Simulation Results</h3>
                <p className="text-gray-600">Real-time insights from your last simulation run</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/60 rounded-xl border border-white/30 hover:bg-white/80 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">{lastSimulation.onTimeDeliveries}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">On-time Deliveries</p>
              </div>

              <div className="text-center p-6 bg-white/60 rounded-xl border border-white/30 hover:bg-white/80 transition-colors">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold text-lg">{lastSimulation.lateDeliveries}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Late Deliveries</p>
              </div>

              <div className="text-center p-6 bg-white/60 rounded-xl border border-white/30 hover:bg-white/80 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">{lastSimulation.driversUsed}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Drivers Used</p>
              </div>

              <div className="text-center p-6 bg-white/60 rounded-xl border border-white/30 hover:bg-white/80 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CurrencyRupeeIcon className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">₹{lastSimulation.totalProfit.toLocaleString()}</p>
                <p className="text-sm text-gray-600 font-medium">Total Profit</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
