"use client";

import Link from "next/link";
import { servicesData } from "@/lib/data/sampleData";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const serviceImages = {
  "baby-care":
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
  "elderly-care":
    "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80",
  "sick-care":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
};

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 lg:py-24">
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
            Our <span className="text-indigo-600">Care Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Professional care solutions tailored to your family's unique needs
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesData.slice(0, 3).map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={
                    serviceImages[service.category] ||
                    service.image ||
                    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cca?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {service.name}
                  </h3>
                  <div className="badge badge-outline text-xs font-semibold text-gray-500">
                    {service.category.replace("-", " ")}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    ({service.reviewsCount}+ reviews)
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Starting at
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ৳{service.hourlyRate}
                      <span className="text-sm font-normal text-gray-500">
                        /hr
                      </span>
                    </p>
                  </div>
                  <Link href={`/services/${service.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-6"
                    >
                      Book <FiArrowRight className="ml-1" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
