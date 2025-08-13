const express = require("express")
const Route = require("../models/Route")
const router = express.Router()

// GET all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find()
    res.json(routes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single route
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id)
    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }
    res.json(route)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create route
router.post("/", async (req, res) => {
  try {
    const route = new Route(req.body)
    const savedRoute = await route.save()
    res.status(201).json(savedRoute)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update route
router.put("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }
    res.json(route)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id)
    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }
    res.json({ message: "Route deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
