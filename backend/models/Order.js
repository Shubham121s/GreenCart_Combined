const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    valueRs: {
      type: Number,
      required: true,
      min: 0,
    },
    assignedRoute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    deliveryTimestamp: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Transit", "Delivered", "Late"],
      default: "Pending",
    },
    isLate: {
      type: Boolean,
      default: false,
    },
    actualDeliveryTime: {
      type: Number, // in minutes
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Order", orderSchema)
