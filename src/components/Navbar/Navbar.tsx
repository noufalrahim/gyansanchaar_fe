import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/SITE_CONFIG";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Colleges", path: "/colleges" },
      { name: "Apply", path: "/apply" },
      { name: "Dashboard", path: "/dashboard" },
    ],
    []
  );

  const isActive = (path: string) => location.pathname === path;

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary-600",
          isActive(link.path) ? "text-primary-700 font-semibold" : "text-gray-700"
        )}
      >
        {link.name}
      </Link>
    ));

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-primary-main font-bold text-2xl flex items-center">
          <span>{SITE_CONFIG.NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">{renderNavLinks()}</div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full text-sm bg-transparent text-primary-main border border-primary-200 hover:bg-primary-50 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full text-sm bg-primary-700 text-white hover:bg-primary-800 transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-primary-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-3">
          <div className="flex flex-col space-y-3">
            {renderNavLinks()}
            <div className="pt-3 flex flex-col space-y-3">
              <Link
                to="/login"
                className="w-full px-5 py-2 rounded-full text-sm text-center bg-transparent text-primary-800 border border-primary-200 hover:bg-primary-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="w-full px-5 py-2 rounded-full text-sm text-center bg-primary-700 text-white hover:bg-primary-800 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
