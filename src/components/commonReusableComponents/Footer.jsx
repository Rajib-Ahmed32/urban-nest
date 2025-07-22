import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#373634] text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            🏢 Building Management System
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            A modern platform to manage your building operations efficiently
            with role-based dashboards, announcements, payment handling, and
            apartment listings. Clean UI, secure backend, and responsive
            experience.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-3 text-sm text-white/90">
            <Link to="/" className="hover:underline hover:text-white">
              Home
            </Link>
            <Link to="/apartment" className="hover:underline hover:text-white">
              Apartment
            </Link>
            <Link to="/login" className="hover:underline hover:text-white">
              Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact & Social</h3>
          <p className="text-sm mb-2 text-white/80">support@buildingms.com</p>
          <p className="text-sm mb-4 text-white/80">+880 1234 567890</p>
          <div className="flex space-x-4 text-sm">
            <a
              href="https://www.facebook.com/rajib.ahmed.632184"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              <Facebook size={18} /> Facebook
            </a>
            <a
              href="https://x.com/rajibahmed25032?t=s8z0nTRZz2tBHqQQBR9-Xg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              <Twitter size={18} /> Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/rajib-ahmed-15997626a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-white/60 mt-10 border-t border-white/10 pt-4">
        &copy; {new Date().getFullYear()} UrbanNest Building Management System.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
