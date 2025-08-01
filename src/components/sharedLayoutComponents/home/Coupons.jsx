import { useQuery } from "@tanstack/react-query";
import axios from "../../../services/apiClient";
import Message from "../../commonReusableComponents/Message";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fetchCoupons = async () => {
  const res = await axios.get("/coupons/public/all");
  return res.data;
};

const Coupons = () => {
  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["public-coupons"],
    queryFn: fetchCoupons,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <Message
        text={`Failed to load coupons: ${error.message}`}
        type="error"
        paddingY="py-10"
      />
    );
  }

  return (
    <div className="bg-[#f1f0ee] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-[#ec5407]">
          Exclusive Building Coupons
        </h2>

        {coupons.length === 0 ? (
          <Message
            text="No coupons are currently available."
            type="info"
            paddingY="py-14"
          />
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {coupons.map((coupon, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border shadow-md p-6 bg-white hover:-translate-y-1 hover:shadow-xl transition-transform duration-300"
                variants={cardVariants}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    Coupon Code
                  </span>
                  <span className="bg-[#ec5407]/10 text-[#ec5407] text-xs px-2 py-1 rounded-full font-medium">
                    Save {coupon.percentage}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#ec5407] mb-2">
                  {coupon.code}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {coupon.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
