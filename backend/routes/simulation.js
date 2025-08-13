// const express = require("express")
// const Driver = require("../models/Driver")
// const Route = require("../models/Route")
// const Order = require("../models/Order")
// const router = express.Router()

// // POST run simulation
// router.post("/run", async (req, res) => {
//   try {
//     const { availableDrivers, routeStartTime, maxHoursPerDay } = req.body

//     // Validation
//     if (!availableDrivers || availableDrivers < 1) {
//       return res.status(400).json({
//         message: "Number of available drivers must be at least 1",
//       })
//     }

//     if (!routeStartTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(routeStartTime)) {
//       return res.status(400).json({
//         message: "Route start time must be in HH:MM format",
//       })
//     }

//     if (!maxHoursPerDay || maxHoursPerDay < 1 || maxHoursPerDay > 24) {
//       return res.status(400).json({
//         message: "Max hours per day must be between 1 and 24",
//       })
//     }

//     // Get all orders and routes
//     const orders = await Order.find({ status: "Pending" }).populate("assignedRoute")
//     const routes = await Route.find()

//     if (orders.length === 0) {
//       return res.status(400).json({
//         message: "No pending orders found for simulation",
//       })
//     }

//     // Simulation logic
//     const simulationResults = await runDeliverySimulation({
//       orders,
//       routes,
//       availableDrivers,
//       routeStartTime,
//       maxHoursPerDay,
//     })

//     res.json(simulationResults)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // Simulation logic function
// async function runDeliverySimulation({ orders, routes, availableDrivers, routeStartTime, maxHoursPerDay }) {
//   let totalProfit = 0
//   let totalFuelCost = 0
//   let onTimeDeliveries = 0
//   let lateDeliveries = 0
//   let totalDeliveries = 0

//   // Create virtual drivers for simulation
//   const drivers = Array.from({ length: availableDrivers }, (_, i) => ({
//     id: i + 1,
//     name: `Driver ${i + 1}`,
//     currentHours: 0,
//     isFatigued: false,
//   }))

//   // Process each order
//   for (const order of orders) {
//     const route = order.assignedRoute
//     if (!route) continue

//     // Find available driver
//     const availableDriver = drivers.find((d) => d.currentHours < maxHoursPerDay)
//     if (!availableDriver) break // No more available drivers

//     // Calculate delivery time
//     let deliveryTime = route.baseTimeMinutes

//     // Apply driver fatigue rule
//     if (availableDriver.currentHours > 8) {
//       deliveryTime *= 1.3 // 30% slower
//       availableDriver.isFatigued = true
//     }

//     // Calculate fuel cost
//     let fuelCost = route.distanceKm * 5 // Base cost ₹5/km
//     if (route.trafficLevel === "High") {
//       fuelCost += route.distanceKm * 2 // Additional ₹2/km for high traffic
//     }

//     // Calculate order profit
//     let orderProfit = order.valueRs

//     // Apply high-value bonus
//     if (order.valueRs > 1000) {
//       orderProfit += order.valueRs * 0.1 // 10% bonus
//     }

//     // Check if delivery is late (assuming base time + 10 minutes is the deadline)
//     const isLate = deliveryTime > route.baseTimeMinutes + 10

//     if (isLate) {
//       orderProfit -= 50 // Late delivery penalty
//       lateDeliveries++
//     } else {
//       onTimeDeliveries++
//     }

//     // Subtract fuel cost from profit
//     orderProfit -= fuelCost

//     totalProfit += orderProfit
//     totalFuelCost += fuelCost
//     totalDeliveries++

//     // Update driver hours
//     availableDriver.currentHours += deliveryTime / 60 // Convert minutes to hours
//   }

//   // Calculate efficiency score
//   const efficiencyScore = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0

//   return {
//     totalProfit: Math.round(totalProfit),
//     totalFuelCost: Math.round(totalFuelCost),
//     onTimeDeliveries,
//     lateDeliveries,
//     totalDeliveries,
//     efficiencyScore: Math.round(efficiencyScore * 100) / 100,
//     driversUsed: drivers.filter((d) => d.currentHours > 0).length,
//     fuelCostBreakdown: {
//       baseCost: Math.round(totalFuelCost * 0.7),
//       trafficSurcharge: Math.round(totalFuelCost * 0.3),
//     },
//   }
// }

// module.exports = router


// const express = require("express")
// const Driver = require("../models/Driver")
// const Route = require("../models/Route")
// const Order = require("../models/Order")
// const router = express.Router()

// // POST run simulation
// router.post("/run", async (req, res) => {
//   try {
//     const { availableDrivers, routeStartTime, maxHoursPerDay } = req.body

//     // Validation
//     if (!availableDrivers || availableDrivers < 1) {
//       return res.status(400).json({
//         message: "Number of available drivers must be at least 1",
//       })
//     }

//     if (!routeStartTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(routeStartTime)) {
//       return res.status(400).json({
//         message: "Route start time must be in HH:MM format",
//       })
//     }

//     if (!maxHoursPerDay || maxHoursPerDay < 1 || maxHoursPerDay > 24) {
//       return res.status(400).json({
//         message: "Max hours per day must be between 1 and 24",
//       })
//     }

//     // Get all orders and routes
//     const orders = await Order.find({ status: "Pending" }).populate("assignedRoute")
//     const routes = await Route.find()

//     if (orders.length === 0) {
//       return res.status(400).json({
//         message: "No pending orders found for simulation",
//       })
//     }

//     // Simulation logic
//     const simulationResults = await runDeliverySimulation({
//       orders,
//       routes,
//       availableDrivers,
//       routeStartTime,
//       maxHoursPerDay,
//     })

//     res.json(simulationResults)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // Simulation logic function
// async function runDeliverySimulation({ orders, routes, availableDrivers, routeStartTime, maxHoursPerDay }) {
//   let totalProfit = 0
//   let totalFuelCost = 0
//   let onTimeDeliveries = 0
//   let lateDeliveries = 0
//   let totalDeliveries = 0

//   // Create virtual drivers for simulation
//   const drivers = Array.from({ length: availableDrivers }, (_, i) => ({
//     id: i + 1,
//     name: `Driver ${i + 1}`,
//     currentHours: 0,
//     isFatigued: false,
//   }))

//   // Process each order
//   for (const order of orders) {
//     const route = order.assignedRoute
//     if (!route) continue

//     // Find available driver
//     const availableDriver = drivers.find((d) => d.currentHours < maxHoursPerDay)
//     if (!availableDriver) break // No more available drivers

//     // Calculate delivery time
//     let deliveryTime = route.baseTimeMinutes

//     // Apply driver fatigue rule
//     if (availableDriver.currentHours > 8) {
//       deliveryTime *= 1.3 // 30% slower
//       availableDriver.isFatigued = true
//     }

//     // Calculate fuel cost
//     let fuelCost = route.distanceKm * 5 // Base cost ₹5/km
//     if (route.trafficLevel === "High") {
//       fuelCost += route.distanceKm * 2 // Additional ₹2/km for high traffic
//     }

//     // Calculate order profit
//     let orderProfit = order.valueRs

//     // Apply high-value bonus
//     if (order.valueRs > 1000) {
//       orderProfit += order.valueRs * 0.1 // 10% bonus
//     }

//     // Check if delivery is late (assuming base time + 10 minutes is the deadline)
//     const isLate = deliveryTime > route.baseTimeMinutes + 10

//     if (isLate) {
//       orderProfit -= 50 // Late delivery penalty
//       lateDeliveries++
//     } else {
//       onTimeDeliveries++
//     }

//     // Subtract fuel cost from profit
//     orderProfit -= fuelCost

//     totalProfit += orderProfit
//     totalFuelCost += fuelCost
//     totalDeliveries++

//     // Update driver hours
//     availableDriver.currentHours += deliveryTime / 60 // Convert minutes to hours
//   }

//   // Calculate efficiency score
//   const efficiencyScore = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0

//   return {
//     totalProfit: Math.round(totalProfit),
//     totalFuelCost: Math.round(totalFuelCost),
//     onTimeDeliveries,
//     lateDeliveries,
//     totalDeliveries,
//     efficiencyScore: Math.round(efficiencyScore * 100) / 100,
//     driversUsed: drivers.filter((d) => d.currentHours > 0).length,
//     fuelCostBreakdown: {
//       baseCost: Math.round(totalFuelCost * 0.7),
//       trafficSurcharge: Math.round(totalFuelCost * 0.3),
//     },
//   }
// }

// module.exports = router



const express = require("express")
const Driver = require("../models/Driver")
const Route = require("../models/Route")
const Order = require("../models/Order")
const router = express.Router()

// POST run simulation
router.post("/run", async (req, res) => {
  try {
    const { availableDrivers, routeStartTime, maxHoursPerDay, realData } = req.body

    // Validation
    if (!availableDrivers || availableDrivers < 1) {
      return res.status(400).json({
        message: "Number of available drivers must be at least 1",
      })
    }

    if (!routeStartTime || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(routeStartTime)) {
      return res.status(400).json({
        message: "Route start time must be in HH:MM format",
      })
    }

    if (!maxHoursPerDay || maxHoursPerDay < 1 || maxHoursPerDay > 24) {
      return res.status(400).json({
        message: "Max hours per day must be between 1 and 24",
      })
    }

    let orders, routes, drivers

    if (realData && realData.orders && realData.routes && realData.drivers) {
      console.log("Using real CSV data for simulation")
      orders = realData.orders
      routes = realData.routes
      drivers = realData.drivers.slice(0, availableDrivers) // Limit to available drivers
    } else {
      // Fallback to database data
      orders = await Order.find({ status: "Pending" }).populate("assignedRoute")
      routes = await Route.find()
      drivers = await Driver.find().limit(availableDrivers)
    }

    if (orders.length === 0) {
      return res.status(400).json({
        message: "No pending orders found for simulation",
      })
    }

    const simulationResults = await runDeliverySimulation({
      orders,
      routes,
      drivers,
      availableDrivers,
      routeStartTime,
      maxHoursPerDay,
      usingRealData: !!realData,
    })

    res.json(simulationResults)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function runDeliverySimulation({
  orders,
  routes,
  drivers,
  availableDrivers,
  routeStartTime,
  maxHoursPerDay,
  usingRealData = false,
}) {
  let totalProfit = 0
  let totalFuelCost = 0
  let totalPenalties = 0
  let totalBonuses = 0
  let onTimeDeliveries = 0
  let lateDeliveries = 0
  let totalDeliveries = 0

  // Create route lookup for efficiency
  const routeMap = new Map()
  routes.forEach((route) => {
    routeMap.set(route.route_id, route)
  })

  // Process each order
  for (const order of orders) {
    const routeId = usingRealData ? order.route_id : order.assignedRoute?._id
    const route = usingRealData ? routeMap.get(routeId) : order.assignedRoute

    if (!route) continue

    // Find available driver
    const availableDriver = drivers.find((d) => (d.current_hours || d.currentHours || 0) < maxHoursPerDay)
    if (!availableDriver) break // No more available drivers

    const baseTime = route.base_time_min || route.baseTimeMinutes || 60
    const distance = route.distance_km || route.distanceKm || 10
    const trafficLevel = route.traffic_level || route.trafficLevel || "Medium"

    // Calculate delivery time
    let deliveryTime = baseTime

    // Apply driver fatigue rule
    const currentHours = availableDriver.current_hours || availableDriver.currentHours || 0
    if (currentHours > 8) {
      deliveryTime *= 1.3 // 30% slower
      availableDriver.isFatigued = true
    }

    // Calculate fuel cost
    let fuelCost = distance * 5 // Base cost ₹5/km
    if (trafficLevel === "High") {
      fuelCost += distance * 2 // Additional ₹2/km for high traffic
    }

    const orderValue = order.value_rs || order.valueRs || 500
    let orderProfit = orderValue

    let orderBonus = 0
    let orderPenalty = 0

    // Apply high-value bonus
    if (orderValue > 1000) {
      orderBonus = orderValue * 0.1 // 10% bonus
      orderProfit += orderBonus
      totalBonuses += orderBonus
    }

    // Check if delivery is late (assuming base time + 10 minutes is the deadline)
    const isLate = deliveryTime > baseTime + 10

    if (isLate) {
      orderPenalty = 50 // Late delivery penalty
      orderProfit -= orderPenalty
      totalPenalties += orderPenalty
      lateDeliveries++
    } else {
      onTimeDeliveries++
    }

    // Subtract fuel cost from profit
    orderProfit -= fuelCost

    totalProfit += orderProfit
    totalFuelCost += fuelCost
    totalDeliveries++

    // Update driver hours
    if (availableDriver.current_hours !== undefined) {
      availableDriver.current_hours += deliveryTime / 60
    } else {
      availableDriver.currentHours = (availableDriver.currentHours || 0) + deliveryTime / 60
    }
  }

  // Calculate efficiency score
  const efficiencyScore = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0

  return {
    totalProfit: Math.round(totalProfit),
    totalFuelCost: Math.round(totalFuelCost),
    totalPenalties: Math.round(totalPenalties),
    totalBonuses: Math.round(totalBonuses),
    onTimeDeliveries,
    lateDeliveries,
    totalDeliveries,
    totalOrders: totalDeliveries,
    completedOrders: totalDeliveries,
    pendingOrders: Math.max(0, orders.length - totalDeliveries),
    efficiencyScore: Math.round(efficiencyScore * 100) / 100,
    driversUsed: drivers.filter((d) => (d.current_hours || d.currentHours || 0) > 0).length,
    fuelCostData: [
      { name: "Base Cost", value: Math.round(totalFuelCost * 0.71), color: "#10b981" },
      { name: "Traffic Surcharge", value: Math.round(totalFuelCost * 0.29), color: "#f59e0b" },
    ],
    deliveryChartData: [
      { name: "On-time", deliveries: onTimeDeliveries, fill: "#10b981" },
      { name: "Late", deliveries: lateDeliveries, fill: "#ef4444" },
    ],
    dataSource: usingRealData ? "CSV" : "Database",
  }
}

module.exports = router

