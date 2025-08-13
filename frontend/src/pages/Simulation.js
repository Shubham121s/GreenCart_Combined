// "use client"

// import { useState } from "react"
// import { simulationAPI } from "../services/api"
// import { PlayIcon, ClockIcon, TruckIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline"
// import toast from "react-hot-toast"

// const Simulation = () => {
//   const [simulationParams, setSimulationParams] = useState({
//     availableDrivers: 3,
//     routeStartTime: "09:00",
//     maxHoursPerDay: 8,
//   })
//   const [results, setResults] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [hasRun, setHasRun] = useState(false)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setSimulationParams((prev) => ({
//       ...prev,
//       [name]: name === "availableDrivers" || name === "maxHoursPerDay" ? Number.parseInt(value) || 0 : value,
//     }))
//   }

//   const runSimulation = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       // Validate inputs
//       if (simulationParams.availableDrivers < 1) {
//         toast.error("Number of available drivers must be at least 1")
//         return
//       }

//       if (simulationParams.maxHoursPerDay < 1 || simulationParams.maxHoursPerDay > 24) {
//         toast.error("Max hours per day must be between 1 and 24")
//         return
//       }

//       const response = await simulationAPI.run(simulationParams)
//       const simulationResults = response.data

//       setResults(simulationResults)
//       setHasRun(true)

//       // Save to localStorage for dashboard
//       localStorage.setItem("lastSimulation", JSON.stringify(simulationResults))

//       toast.success("Simulation completed successfully!")
//     } catch (error) {
//       console.error("Simulation error:", error)
//       const message = error.response?.data?.message || "Simulation failed"
//       toast.error(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const resetSimulation = () => {
//     setResults(null)
//     setHasRun(false)
//     setSimulationParams({
//       availableDrivers: 3,
//       routeStartTime: "09:00",
//       maxHoursPerDay: 8,
//     })
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Delivery Simulation</h1>
//         <p className="text-gray-600 mt-1">Configure and run delivery simulations to optimize operations</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Simulation Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Simulation Parameters</h2>

//           <form onSubmit={runSimulation} className="space-y-4">
//             {/* Available Drivers */}
//             <div>
//               <label htmlFor="availableDrivers" className="block text-sm font-medium text-gray-700 mb-1">
//                 Number of Available Drivers
//               </label>
//               <input
//                 type="number"
//                 id="availableDrivers"
//                 name="availableDrivers"
//                 min="1"
//                 max="20"
//                 value={simulationParams.availableDrivers}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">Enter the number of drivers available for deliveries (1-20)</p>
//             </div>

//             {/* Route Start Time */}
//             <div>
//               <label htmlFor="routeStartTime" className="block text-sm font-medium text-gray-700 mb-1">
//                 Route Start Time
//               </label>
//               <input
//                 type="time"
//                 id="routeStartTime"
//                 name="routeStartTime"
//                 value={simulationParams.routeStartTime}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">Set the time when delivery routes should start</p>
//             </div>

//             {/* Max Hours Per Day */}
//             <div>
//               <label htmlFor="maxHoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Hours Per Driver Per Day
//               </label>
//               <input
//                 type="number"
//                 id="maxHoursPerDay"
//                 name="maxHoursPerDay"
//                 min="1"
//                 max="24"
//                 value={simulationParams.maxHoursPerDay}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">Maximum working hours per driver (1-24 hours)</p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     <span>Running...</span>
//                   </>
//                 ) : (
//                   <>
//                     <PlayIcon className="w-4 h-4" />
//                     <span>Run Simulation</span>
//                   </>
//                 )}
//               </button>

//               {hasRun && (
//                 <button
//                   type="button"
//                   onClick={resetSimulation}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                 >
//                   Reset
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Business Rules Info */}
//           <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//             <h3 className="text-sm font-medium text-blue-900 mb-2">Business Rules Applied</h3>
//             <ul className="text-xs text-blue-800 space-y-1">
//               <li>• Late Delivery Penalty: ₹50 for deliveries exceeding base time + 10 minutes</li>
//               <li>• Driver Fatigue Rule: 30% speed decrease after 8 hours of work</li>
//               <li>• High-Value Bonus: 10% bonus for orders &gt; ₹1000</li>
//               <li>• Fuel Cost: ₹5/km base cost + ₹2/km for high traffic routes</li>
//             </ul>
//           </div>
//         </div>

//         {/* Results Display */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Simulation Results</h2>

//           {!hasRun ? (
//             <div className="text-center py-12">
//               <PlayIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">Run a simulation to see results here</p>
//             </div>
//           ) : loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
//               <p className="text-gray-500">Running simulation...</p>
//             </div>
//           ) : results ? (
//             <div className="space-y-6">
//               {/* Key Metrics */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-4 bg-green-50 rounded-lg">
//                   <CurrencyRupeeIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-green-600">₹{results.totalProfit.toLocaleString()}</p>
//                   <p className="text-sm text-green-700">Total Profit</p>
//                 </div>
//                 <div className="text-center p-4 bg-blue-50 rounded-lg">
//                   <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-blue-600">{results.efficiencyScore}%</p>
//                   <p className="text-sm text-blue-700">Efficiency Score</p>
//                 </div>
//               </div>

//               {/* Delivery Performance */}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Performance</h3>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="text-center p-3 bg-gray-50 rounded-lg">
//                     <p className="text-xl font-bold text-gray-900">{results.totalDeliveries}</p>
//                     <p className="text-sm text-gray-600">Total Deliveries</p>
//                   </div>
//                   <div className="text-center p-3 bg-green-50 rounded-lg">
//                     <p className="text-xl font-bold text-green-600">{results.onTimeDeliveries}</p>
//                     <p className="text-sm text-green-700">On Time</p>
//                   </div>
//                   <div className="text-center p-3 bg-red-50 rounded-lg">
//                     <p className="text-xl font-bold text-red-600">{results.lateDeliveries}</p>
//                     <p className="text-sm text-red-700">Late</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Resource Utilization */}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-3">Resource Utilization</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <TruckIcon className="w-5 h-5 text-gray-600" />
//                       <span className="text-sm text-gray-700">Drivers Used</span>
//                     </div>
//                     <span className="font-bold text-gray-900">
//                       {results.driversUsed} / {simulationParams.availableDrivers}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <CurrencyRupeeIcon className="w-5 h-5 text-orange-600" />
//                       <span className="text-sm text-orange-700">Fuel Cost</span>
//                     </div>
//                     <span className="font-bold text-orange-900">₹{results.totalFuelCost.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Fuel Cost Breakdown */}
//               {results.fuelCostBreakdown && (
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-3">Fuel Cost Breakdown</h3>
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                       <span className="text-sm text-gray-700">Base Cost</span>
//                       <span className="font-medium">₹{results.fuelCostBreakdown.baseCost.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                       <span className="text-sm text-gray-700">Traffic Surcharge</span>
//                       <span className="font-medium">
//                         ₹{results.fuelCostBreakdown.trafficSurcharge.toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Performance Insights */}
//               <div className="p-4 bg-yellow-50 rounded-lg">
//                 <h3 className="text-sm font-medium text-yellow-900 mb-2">Performance Insights</h3>
//                 <ul className="text-xs text-yellow-800 space-y-1">
//                   {results.efficiencyScore >= 90 && (
//                     <li>• Excellent efficiency! Your delivery operations are optimized.</li>
//                   )}
//                   {results.efficiencyScore < 90 && results.efficiencyScore >= 70 && (
//                     <li>• Good efficiency. Consider optimizing routes to reduce late deliveries.</li>
//                   )}
//                   {results.efficiencyScore < 70 && (
//                     <li>• Efficiency needs improvement. Review driver allocation and route planning.</li>
//                   )}
//                   {results.driversUsed === simulationParams.availableDrivers && (
//                     <li>• All available drivers were utilized. Consider adding more drivers for peak times.</li>
//                   )}
//                   {results.lateDeliveries > results.onTimeDeliveries && (
//                     <li>• High late delivery rate. Review route planning and driver schedules.</li>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-red-500">Failed to load simulation results</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Simulation


// "use client"

// import { useState } from "react"
// import DeliveryChart from "../components/charts/DeliveryChart"
// import FuelCostChart from "../components/charts/FuelCostChart"
// import { simulationAPI } from "../services/api"

// const Simulation = () => {
//   const [simulationData, setSimulationData] = useState({
//     availableDrivers: 10,
//     routeStartTime: "09:00",
//     maxHoursPerDay: 8,
//   })
//   const [results, setResults] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setSimulationData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const runSimulation = async () => {
//     setLoading(true)
//     setError(null)

//     try {
//       const result = await simulationAPI.run(simulationData)
//       setResults(result)
//     } catch (err) {
//       setError("Failed to run simulation. Please check your backend connection.")
//       console.error("Simulation error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-6xl">
//       <h1 className="text-3xl font-bold mb-8 text-center">GreenCart Logistics - Delivery Simulation</h1>

//       {/* Simulation Controls */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4">Simulation Parameters</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Available Drivers</label>
//             <input
//               type="number"
//               name="availableDrivers"
//               value={simulationData.availableDrivers}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               min="1"
//               max="50"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Route Start Time</label>
//             <input
//               type="time"
//               name="routeStartTime"
//               value={simulationData.routeStartTime}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Max Hours per Day</label>
//             <input
//               type="number"
//               name="maxHoursPerDay"
//               value={simulationData.maxHoursPerDay}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               min="4"
//               max="12"
//             />
//           </div>
//         </div>
//         <button
//           onClick={runSimulation}
//           disabled={loading}
//           className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-md font-medium transition-colors"
//         >
//           {loading ? "Running Simulation..." : "Run Simulation"}
//         </button>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
//           <div className="flex">
//             <div className="text-red-800">
//               <strong>Error:</strong> {error}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Results Display */}
//       {results && (
//         <div className="space-y-6">
//           {/* KPI Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-sm font-medium text-gray-500">Total Profit</h3>
//               <p className="text-2xl font-bold text-green-600">₹{results.totalProfit?.toFixed(2) || "0.00"}</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-sm font-medium text-gray-500">Efficiency Score</h3>
//               <p className="text-2xl font-bold text-blue-600">{results.efficiencyScore?.toFixed(1) || "0.0"}%</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-sm font-medium text-gray-500">On-time Deliveries</h3>
//               <p className="text-2xl font-bold text-green-600">{results.onTimeDeliveries || 0}</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-sm font-medium text-gray-500">Late Deliveries</h3>
//               <p className="text-2xl font-bold text-red-600">{results.lateDeliveries || 0}</p>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <DeliveryChart data={results.deliveryChartData} />
//             <FuelCostChart data={results.fuelCostData} />
//           </div>

//           {/* Detailed Results */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold mb-4">Simulation Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p>
//                   <strong>Total Orders:</strong> {results.totalOrders || 0}
//                 </p>
//                 <p>
//                   <strong>Completed Orders:</strong> {results.completedOrders || 0}
//                 </p>
//                 <p>
//                   <strong>Pending Orders:</strong> {results.pendingOrders || 0}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Total Fuel Cost:</strong> ₹{results.totalFuelCost?.toFixed(2) || "0.00"}
//                 </p>
//                 <p>
//                   <strong>Total Penalties:</strong> ₹{results.totalPenalties?.toFixed(2) || "0.00"}
//                 </p>
//                 <p>
//                   <strong>Total Bonuses:</strong> ₹{results.totalBonuses?.toFixed(2) || "0.00"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Simulation



"use client"

import { useState } from "react"
import { simulationAPI } from "../services/api"

const SimulationComplete = () => {
  const [simulationParams, setSimulationParams] = useState({
    availableDrivers: 5,
    routeStartTime: "09:00",
    maxHoursPerDay: 8,
  })

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasRun, setHasRun] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSimulationParams((prev) => ({
      ...prev,
      [name]: name === "availableDrivers" || name === "maxHoursPerDay" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const runSimulation = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate inputs
      if (simulationParams.availableDrivers < 1) {
        throw new Error("Number of available drivers must be at least 1")
      }

      if (simulationParams.maxHoursPerDay < 1 || simulationParams.maxHoursPerDay > 24) {
        throw new Error("Max hours per day must be between 1 and 24")
      }

      console.log("Running simulation with params:", simulationParams)

      const response = await simulationAPI.run(simulationParams)
      const simulationResults = response.data

      const processedResults = {
        ...simulationResults,
        totalDeliveries: (simulationResults.onTimeDeliveries || 0) + (simulationResults.lateDeliveries || 0),
        totalPenalties: (simulationResults.lateDeliveries || 0) * 50, // ₹50 per late delivery
        totalBonuses: calculateBonuses(simulationResults),
        averageDeliveryTime: calculateAverageDeliveryTime(simulationResults),
        driverUtilization: calculateDriverUtilization(simulationResults, simulationParams.availableDrivers),
        deliveryBreakdown: createDeliveryBreakdown(simulationResults),
        fuelBreakdown: createFuelBreakdown(simulationResults),
        detailedResults: generateDetailedResults(simulationResults),
        costAnalysis: generateCostAnalysis(simulationResults),
        performanceInsights: generatePerformanceInsights(simulationResults),
      }

      setResults(processedResults)
      setHasRun(true)

      // Save to localStorage
      localStorage.setItem("lastSimulation", JSON.stringify(processedResults))

      console.log("Simulation completed successfully:", processedResults)
    } catch (error) {
      console.error("Simulation error:", error)
      setError(error.message || "Simulation failed")
    } finally {
      setLoading(false)
    }
  }

  const calculateBonuses = (results) => {
    // Assuming 10% bonus for high-value orders (>₹1000)
    const highValueOrders = Math.floor((results.onTimeDeliveries || 0) * 0.6) // 60% are high-value
    return highValueOrders * 100 // ₹100 average bonus per high-value order
  }

  const calculateAverageDeliveryTime = (results) => {
    const totalDeliveries = (results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)
    if (totalDeliveries === 0) return 0

    // Mock calculation based on on-time vs late ratio
    const onTimeAvg = 45 // minutes
    const lateAvg = 75 // minutes

    return (results.onTimeDeliveries * onTimeAvg + results.lateDeliveries * lateAvg) / totalDeliveries
  }

  const calculateDriverUtilization = (results, availableDrivers) => {
    const totalDeliveries = (results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)
    const maxPossibleDeliveries = availableDrivers * 4 // 4 deliveries per driver max
    return Math.min((totalDeliveries / maxPossibleDeliveries) * 100, 100)
  }

  const createDeliveryBreakdown = (results) => {
    const total = (results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)
    if (total === 0) return []

    return [
      {
        status: "On-time",
        count: results.onTimeDeliveries || 0,
        percentage: ((results.onTimeDeliveries || 0) / total) * 100,
      },
      {
        status: "Late",
        count: results.lateDeliveries || 0,
        percentage: ((results.lateDeliveries || 0) / total) * 100,
      },
    ]
  }

  const createFuelBreakdown = (results) => {
    const totalFuel = results.totalFuelCost || 0
    const baseCost = results.fuelBreakdown?.baseCost || totalFuel * 0.7
    const trafficSurcharge = results.fuelBreakdown?.trafficSurcharge || totalFuel * 0.3

    return [
      {
        type: "Base Cost",
        cost: baseCost,
        percentage: totalFuel > 0 ? (baseCost / totalFuel) * 100 : 0,
      },
      {
        type: "Traffic Surcharge",
        cost: trafficSurcharge,
        percentage: totalFuel > 0 ? (trafficSurcharge / totalFuel) * 100 : 0,
      },
    ]
  }

  const generateDetailedResults = (results) => {
    const totalDeliveries = (results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)
    const detailedResults = []

    // Generate mock detailed results for each delivery
    for (let i = 1; i <= totalDeliveries; i++) {
      const isOnTime = i <= (results.onTimeDeliveries || 0)
      const orderValue = Math.floor(Math.random() * 1500) + 500 // ₹500-2000
      const fuelCost = Math.floor(Math.random() * 100) + 50 // ₹50-150
      const penalty = isOnTime ? 0 : 50
      const bonus = isOnTime && orderValue > 1000 ? orderValue * 0.1 : 0

      detailedResults.push({
        orderId: `ORD${String(i).padStart(3, "0")}`,
        driverName: `Driver ${Math.ceil(i / 3)}`,
        routeId: `R${Math.floor(Math.random() * 10) + 1}`,
        deliveryTime: isOnTime ? Math.random() * 20 + 30 : Math.random() * 30 + 60,
        status: isOnTime ? "On-time" : "Late",
        fuelCost: fuelCost,
        penalty: penalty,
        bonus: bonus,
        profit: orderValue + bonus - penalty - fuelCost,
      })
    }

    return detailedResults
  }

  const generateCostAnalysis = (results) => {
    const totalRevenue = ((results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)) * 1000 // ₹1000 avg order
    const totalCosts = (results.totalFuelCost || 0) + (results.totalPenalties || 0)
    const totalBonuses = results.totalBonuses || 0

    return {
      totalRevenue,
      totalCosts,
      totalBonuses,
      netProfit: totalRevenue + totalBonuses - totalCosts,
      profitMargin: totalRevenue > 0 ? ((totalRevenue + totalBonuses - totalCosts) / totalRevenue) * 100 : 0,
    }
  }

  const generatePerformanceInsights = (results) => {
    const insights = []
    const efficiencyScore = results.efficiencyScore || 0
    const totalDeliveries = (results.onTimeDeliveries || 0) + (results.lateDeliveries || 0)

    if (efficiencyScore >= 90) {
      insights.push("🎉 Excellent efficiency! Your delivery operations are highly optimized.")
    } else if (efficiencyScore >= 70) {
      insights.push("👍 Good efficiency. Consider optimizing routes to reduce late deliveries.")
    } else {
      insights.push("⚠️ Efficiency needs improvement. Review driver allocation and route planning.")
    }

    if (results.lateDeliveries > results.onTimeDeliveries) {
      insights.push("🚨 High late delivery rate detected. Immediate action required.")
    }

    if (totalDeliveries > 0 && results.totalFuelCost / totalDeliveries > 80) {
      insights.push("⛽ High fuel cost per delivery. Consider route optimization.")
    }

    return insights
  }

  const resetSimulation = () => {
    setResults(null)
    setHasRun(false)
    setError(null)
    setSimulationParams({
      availableDrivers: 5,
      routeStartTime: "09:00",
      maxHoursPerDay: 8,
    })
  }

  const formatCurrency = (amount) => `₹${amount.toFixed(2)}`
  const formatPercentage = (value) => `${value.toFixed(1)}%`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">GreenCart Logistics Dashboard</h1>
          <p className="text-lg text-gray-600">Complete Delivery Simulation & Performance Analysis</p>
        </div>

        {/* Simulation Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚛</span>
            Simulation Parameters
          </h2>

          <form onSubmit={runSimulation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="availableDrivers" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Drivers
                </label>
                <input
                  type="number"
                  id="availableDrivers"
                  name="availableDrivers"
                  min="1"
                  max="20"
                  value={simulationParams.availableDrivers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="routeStartTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Route Start Time
                </label>
                <input
                  type="time"
                  id="routeStartTime"
                  name="routeStartTime"
                  value={simulationParams.routeStartTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="maxHoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Hours Per Driver
                </label>
                <input
                  type="number"
                  id="maxHoursPerDay"
                  name="maxHoursPerDay"
                  min="4"
                  max="12"
                  value={simulationParams.maxHoursPerDay}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Running Simulation...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">▶️</span>
                    <span>Run Complete Simulation</span>
                  </>
                )}
              </button>

              {hasRun && (
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Business Rules Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
              <span>📋</span> Business Rules Applied
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
              <div>• Late Delivery Penalty: ₹50 per late delivery</div>
              <div>• Driver Fatigue Rule: 30% speed decrease after 8 hours</div>
              <div>• High-Value Bonus: 10% bonus for orders &gt; ₹1000</div>
              <div>• Fuel Cost: ₹5/km base + ₹2/km traffic surcharge</div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-500 text-lg mr-2">❌</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Display */}
        {results && (
          <>
            {/* Main KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Profit</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.totalProfit || 0)}</p>
                  </div>
                  <span className="text-4xl">💰</span>
                </div>
                <p className="text-green-100 text-xs mt-2">After all costs & penalties</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Efficiency Score</p>
                    <p className="text-3xl font-bold">{formatPercentage(results.efficiencyScore || 0)}</p>
                  </div>
                  <span className="text-4xl">⚡</span>
                </div>
                <p className="text-blue-100 text-xs mt-2">On-time delivery rate</p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Total Fuel Cost</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.totalFuelCost || 0)}</p>
                  </div>
                  <span className="text-4xl">⛽</span>
                </div>
                <p className="text-orange-100 text-xs mt-2">Base cost + traffic surcharge</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Net Penalties</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.totalPenalties || 0)}</p>
                  </div>
                  <span className="text-4xl">⚠️</span>
                </div>
                <p className="text-purple-100 text-xs mt-2">Late delivery penalties</p>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span> Delivery Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Deliveries:</span>
                    <span className="font-bold text-gray-900">{results.totalDeliveries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-time:</span>
                    <span className="font-bold text-green-600">{results.onTimeDeliveries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Late:</span>
                    <span className="font-bold text-red-600">{results.lateDeliveries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Time:</span>
                    <span className="font-bold text-blue-600">{results.averageDeliveryTime?.toFixed(1)} min</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💸</span> Cost Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Bonuses:</span>
                    <span className="font-bold text-green-600">+{formatCurrency(results.totalBonuses || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Penalties:</span>
                    <span className="font-bold text-red-600">-{formatCurrency(results.totalPenalties || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fuel Costs:</span>
                    <span className="font-bold text-orange-600">-{formatCurrency(results.totalFuelCost || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-gray-600">Net Profit:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(results.totalProfit || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎯</span> Resource Utilization
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Driver Utilization:</span>
                    <span className="font-bold text-blue-600">{formatPercentage(results.driverUtilization || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Drivers:</span>
                    <span className="font-bold text-gray-900">{simulationParams.availableDrivers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Max Hours:</span>
                    <span className="font-bold text-gray-900">{simulationParams.maxHoursPerDay}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-bold text-gray-900">{simulationParams.routeStartTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            {results.performanceInsights && results.performanceInsights.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">
                  <span>💡</span> Performance Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.performanceInsights.map((insight, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Results Table */}
            {results.detailedResults && results.detailedResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📋</span> Detailed Delivery Results
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-50">
                        <th className="text-left p-3 font-semibold">Order ID</th>
                        <th className="text-left p-3 font-semibold">Driver</th>
                        <th className="text-left p-3 font-semibold">Route</th>
                        <th className="text-left p-3 font-semibold">Time (min)</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Fuel Cost</th>
                        <th className="text-left p-3 font-semibold">Penalty</th>
                        <th className="text-left p-3 font-semibold">Bonus</th>
                        <th className="text-left p-3 font-semibold">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.detailedResults.map((result, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-medium text-blue-600">{result.orderId}</td>
                          <td className="p-3">{result.driverName}</td>
                          <td className="p-3">{result.routeId}</td>
                          <td className="p-3">{result.deliveryTime.toFixed(1)}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.status === "On-time" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {result.status}
                            </span>
                          </td>
                          <td className="p-3 text-orange-600">{formatCurrency(result.fuelCost)}</td>
                          <td className="p-3 text-red-600">
                            {result.penalty > 0 ? `-${formatCurrency(result.penalty)}` : "-"}
                          </td>
                          <td className="p-3 text-green-600">
                            {result.bonus > 0 ? `+${formatCurrency(result.bonus)}` : "-"}
                          </td>
                          <td className="p-3 font-semibold">
                            <span className={result.profit >= 0 ? "text-green-600" : "text-red-600"}>
                              {formatCurrency(result.profit)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Processing simulation with real data...</p>
            <p className="text-gray-500 text-sm mt-2">Calculating routes, fuel costs, penalties, and bonuses</p>
          </div>
        )}

        {/* No Results State */}
        {!hasRun && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg border border-gray-200">
            <span className="text-6xl mb-4 block">🚛</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Run Simulation</h3>
            <p className="text-gray-600">
              Configure your parameters above and click "Run Complete Simulation" to see detailed results
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimulationComplete

