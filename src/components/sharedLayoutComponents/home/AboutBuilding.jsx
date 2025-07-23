import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

const AboutBuilding = () => {
  return (
    <section className="py-20 bg-white px-6 md:px-16 lg:px-24">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-[#ec5407] mb-8 tracking-wide"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          About Our Building
        </motion.h2>

        <motion.p
          className="text-gray-700 text-lg leading-relaxed mb-10 font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to our state-of-the-art residential building, where luxury
          meets innovation. Nestled in the heart of the city, this building
          combines timeless architecture with modern amenities, offering
          residents a unique living experience. From spacious apartments with
          panoramic views to environmentally friendly designs, every detail has
          been thoughtfully crafted.
        </motion.p>

        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Building2 size={48} strokeWidth={1.8} className="text-[#ec5407]" />
        </motion.div>

        <motion.p
          className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed font-light italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          "Designed to inspire, built to last — a place you are proud to call
          home."
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutBuilding;
