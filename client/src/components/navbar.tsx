import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";

// Import the logos from attached assets
import navLogo from "@assets/nav_logo_1771534612381.png";
import whiteTransLogo from "@assets/white_trans_1771534699434.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="z-50 relative">
          <img
            src={isScrolled ? navLogo : whiteTransLogo}
            alt="Infinet Development"
            className="h-10 md:h-12 w-auto transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium tracking-wide transition-colors ${
              isScrolled
                ? "text-slate-800 hover:text-blue-600"
                : "text-white hover:text-white/80"
            }`}
          >
            Home
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className={`md:hidden z-50 focus:outline-none ${
            isScrolled || mobileMenuOpen ? "text-slate-800" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-8 w-8" />
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-semibold text-slate-800 hover:text-blue-600 mb-8"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
