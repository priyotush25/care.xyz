"use client";

import { FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Mother of two",
      image: "https://i.pravatar.cc/150?u=sarah",
      rating: 5,
      text: "The babysitting service has been a lifesaver! Our caregiver is professional, caring, and my kids absolutely love her. Highly recommend!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Family Caregiver",
      image: "https://i.pravatar.cc/150?u=michael",
      rating: 5,
      text: "Finding quality elderly care for my father was challenging until I found Care.xyz. The caregiver is compassionate and skilled.",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Working Professional",
      image: "https://i.pravatar.cc/150?u=emily",
      rating: 5,
      text: "Excellent service! The booking process was smooth and the caregiver exceeded our expectations. Worth every penny.",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-indigo-600">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Hear from families who trust us with their loved ones
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
