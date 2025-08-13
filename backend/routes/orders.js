const express = require("express")
const Order = require("../models/Order")
const router = express.Router()

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("assignedRoute").populate("assignedDriver")
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("assignedRoute").populate("assignedDriver")
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body)
    const savedOrder = await order.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update order
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json({ message: "Order deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
