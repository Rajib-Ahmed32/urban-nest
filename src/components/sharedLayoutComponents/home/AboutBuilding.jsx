import { Building2 } from "lucide-react";

const AboutBuilding = () => {
  return (
    <section className="py-20 bg-white px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#ec5407] mb-8 tracking-wide">
          About Our Building
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-10 font-serif">
          Welcome to our state-of-the-art residential building, where luxury
          meets innovation. Nestled in the heart of the city, this building
          combines timeless architecture with modern amenities, offering
          residents a unique living experience. From spacious apartments with
          panoramic views to environmentally friendly designs, every detail has
          been thoughtfully crafted.
        </p>

        <div className="flex justify-center mb-8">
          <Building2 size={48} strokeWidth={1.8} className="text-[#ec5407]" />
        </div>

        <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed font-light italic">
          "Designed to inspire, built to last — a place you are proud to call
          home."
        </p>
      </div>
    </section>
  );
};

export default AboutBuilding;
