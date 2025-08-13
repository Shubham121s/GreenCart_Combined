const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/drivers", require("./routes/drivers"))
app.use("/api/routes", require("./routes/routes"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/simulation", require("./routes/simulation"))
app.use("/api/auth", require("./routes/auth"))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err))

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "GreenCart Logistics API Server" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
