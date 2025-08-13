const mongoose = require("mongoose")

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    currentShiftHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    past7DayWorkHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    currentLocation: {
      type: String,
      default: "Base",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Driver", driverSchema)
