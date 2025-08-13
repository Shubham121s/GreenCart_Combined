const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Driver = require("../models/Driver")
const Route = require("../models/Route")
const Order = require("../models/Order")

dotenv.config()

// Sample data
const sampleDrivers = [
  { name: "Rajesh Kumar", currentShiftHours: 2, past7DayWorkHours: 35 },
  { name: "Priya Sharma", currentShiftHours: 0, past7DayWorkHours: 28 },
  { name: "Amit Singh", currentShiftHours: 4, past7DayWorkHours: 42 },
  { name: "Sunita Devi", currentShiftHours: 1, past7DayWorkHours: 30 },
  { name: "Vikram Yadav", currentShiftHours: 3, past7DayWorkHours: 38 },
]

const sampleRoutes = [
  {
    routeId: "R001",
    distanceKm: 15,
    trafficLevel: "Medium",
    baseTimeMinutes: 45,
    startLocation: "Warehouse A",
    endLocation: "Sector 1",
  },
  {
    routeId: "R002",
    distanceKm: 8,
    trafficLevel: "Low",
    baseTimeMinutes: 25,
    startLocation: "Warehouse A",
    endLocation: "Sector 2",
  },
  {
    routeId: "R003",
    distanceKm: 22,
    trafficLevel: "High",
    baseTimeMinutes: 65,
    startLocation: "Warehouse B",
    endLocation: "Sector 3",
  },
  {
    routeId: "R004",
    distanceKm: 12,
    trafficLevel: "Medium",
    baseTimeMinutes: 35,
    startLocation: "Warehouse A",
    endLocation: "Sector 4",
  },
  {
    routeId: "R005",
    distanceKm: 18,
    trafficLevel: "High",
    baseTimeMinutes: 55,
    startLocation: "Warehouse B",
    endLocation: "Sector 5",
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await Driver.deleteMany({})
    await Route.deleteMany({})
    await Order.deleteMany({})
    console.log("Cleared existing data")

    // Insert drivers
    const drivers = await Driver.insertMany(sampleDrivers)
    console.log("Inserted drivers")

    // Insert routes
    const routes = await Route.insertMany(sampleRoutes)
    console.log("Inserted routes")

    // Create sample orders
    const sampleOrders = [
      { orderId: "ORD001", valueRs: 850, assignedRoute: routes[0]._id },
      { orderId: "ORD002", valueRs: 1200, assignedRoute: routes[1]._id },
      { orderId: "ORD003", valueRs: 650, assignedRoute: routes[2]._id },
      { orderId: "ORD004", valueRs: 1500, assignedRoute: routes[3]._id },
      { orderId: "ORD005", valueRs: 900, assignedRoute: routes[4]._id },
      { orderId: "ORD006", valueRs: 750, assignedRoute: routes[0]._id },
      { orderId: "ORD007", valueRs: 1100, assignedRoute: routes[1]._id },
      { orderId: "ORD008", valueRs: 2000, assignedRoute: routes[2]._id },
    ]

    await Order.insertMany(sampleOrders)
    console.log("Inserted orders")

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
