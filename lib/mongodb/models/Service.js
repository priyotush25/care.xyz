// Service model
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["baby-care", "elderly-care", "sick-care"],
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
