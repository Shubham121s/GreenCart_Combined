const mongoose = require("mongoose")

const routeSchema = new mongoose.Schema(
  {
    routeId: {
      type: String,
      required: true,
      unique: true,
    },
    distanceKm: {
      type: Number,
      required: true,
      min: 0,
    },
    trafficLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    baseTimeMinutes: {
      type: Number,
      required: true,
      min: 0,
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Route", routeSchema)
