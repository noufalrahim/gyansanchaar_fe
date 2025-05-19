import { SITE_CONFIG } from '@/constants/SITE_CONFIG';
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/gyan_sanchaar_primary.webp'

const Footer = () => {
  return (
    <footer className="bg-primary-main text-white pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block text-2xl font-bold">
              <img src={logo} className="h-32 object-contain" loading="lazy" />
            </Link>
            <p className="text-primary-200 text-sm max-w-xs">
              Your streamlined pathway to college admissions, simplifying the journey from application to enrollment.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link to="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-primary-200 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/colleges" className="text-primary-200 hover:text-white transition-colors">Colleges</Link></li>
              <li><Link to="/apply" className="text-primary-200 hover:text-white transition-colors">Apply</Link></li>
              <li><Link to="/dashboard" className="text-primary-200 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/about" className="text-primary-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-primary-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Students</h3>
            <ul className="space-y-3">
              <li><Link to="/guide" className="text-primary-200 hover:text-white transition-colors">Admission Guide</Link></li>
              <li><Link to="/scholarships" className="text-primary-200 hover:text-white transition-colors">Scholarships</Link></li>
              <li><Link to="/faq" className="text-primary-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/resources" className="text-primary-200 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/events" className="text-primary-200 hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="text-primary-300 mt-0.5 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-primary-200">123 Education Lane, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-300 shrink-0" />
                <span className="text-primary-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-300 shrink-0" />
                <span className="text-primary-200">{SITE_CONFIG.EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.NAME}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="text-primary-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-primary-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-primary-300 hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
