// Booking model
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  duration: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["hours", "days"],
      required: true,
    },
  },
  location: {
    division: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent Mongoose OverwriteModelError by checking if it exists, but also allow schema updates in dev
if (mongoose.models.Booking) {
  delete mongoose.models.Booking;
}

export default mongoose.model("Booking", BookingSchema);
