import { useState } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleRegisterDropdown = () => {
    setRegisterDropdownOpen(!registerDropdownOpen);
  };

  // Navbar data structure
  const navItems = [
    {
      title: "About Us",
      dropdown: [
        { title: "Who We Are", description: "Your trusted partner in financial solutions" },
        { title: "Leadership", description: "Leading with purpose, driving excellence" },
        { title: "Our Vision", description: "Transforming financial ecosystems" },
        { title: "Careers", description: "Join our innovative team" }
      ]
    },
    {
      title: "Services",
      dropdown: [
        { title: "Invoice Discounting", description: "Optimize your working capital" },
        { title: "Supply Chain Finance", description: "Streamline your supply chain payments" },
        { title: "Financial Analytics", description: "Data-driven financial insights" },
        { title: "Corporate Solutions", description: "Tailored for enterprise needs" }
      ]
    },
    {
      title: "Resources",
      dropdown: [
        { title: "Knowledge Center", description: "Educational materials & guides" },
        { title: "Blog", description: "Insights on financial innovation" },
        { title: "Case Studies", description: "Success stories from our clients" },
        { title: "FAQs", description: "Common questions answered" }
      ]
    },
    {
      title: "Media",
      dropdown: [
        { title: "News", description: "Latest updates from LedgerBridge" },
        { title: "Events", description: "Upcoming webinars and conferences" },
        { title: "Press Releases", description: "Official announcements" }
      ]
    }
  ];

  return (
    <div className="w-full font-sans">
      {/* Top bar with contact info */}
      {/* <div className="bg-[#006A71] text-white py-2 px-4 sm:px-6 md:px-8">
        
      </div> */}

      {/* Main navbar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#48A6A7] flex items-center justify-center text-white font-bold text-xl">
                    LB
                </div>
                <span className="ml-2 text-[#006A71] font-bold text-xl">LedgerBridge</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button 
                    className="px-3 py-2 rounded-md text-[#006A71] font-medium hover:bg-[#F2EFE7] transition-colors flex items-center"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    {item.title}
                    <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {activeDropdown === item.title && (
                    <div className="absolute left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-[#9ACBD0]">
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem, idx) => (
                          <a 
                            key={idx} 
                            href={`#${dropdownItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-3 hover:bg-[#F2EFE7] rounded-md transition-colors"
                          >
                            <div className="font-medium text-[#006A71]">{dropdownItem.title}</div>
                            <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <a href="/contact" className="px-3 py-2 rounded-md text-[#006A71] font-medium hover:bg-[#F2EFE7] transition-colors">
                Contact Us
              </a>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a href="/login" className="px-6 py-2 border border-[#48A6A7] text-[#48A6A7] font-medium rounded-md hover:bg-[#F2EFE7] transition-colors">
                Login
              </a>
              
              {/* Register dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleRegisterDropdown}
                  className="px-6 py-2 bg-[#006A71] text-white font-medium rounded-md hover:bg-[#48A6A7] transition-colors flex items-center"
                >
                  Register
                  <ChevronDown size={16} className={`ml-1 transition-transform ${registerDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {registerDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-[#9ACBD0]">
                    <a href="/register/buyer" className="block px-4 py-2 hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Buyer
                    </a>
                    <a href="/register/supplier" className="block px-4 py-2 hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Seller
                    </a>
                    <a href="/register/financier" className="block px-4 py-2 hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Financier
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-md text-[#006A71] hover:bg-[#F2EFE7]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#9ACBD0]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <div key={index}>
                  <button 
                    className="w-full flex justify-between items-center px-3 py-2 text-[#006A71] hover:bg-[#F2EFE7] rounded-md"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === item.title && (
                    <div className="pl-4 py-2 space-y-1">
                      {item.dropdown.map((dropdownItem, idx) => (
                        <a 
                          key={idx} 
                          href={`#${dropdownItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-3 py-2 rounded-md hover:bg-[#F2EFE7] transition-colors"
                        >
                          <div className="font-medium text-[#006A71]">{dropdownItem.title}</div>
                          <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <a href="/contact" className="block px-3 py-2 rounded-md text-[#006A71] font-medium hover:bg-[#F2EFE7] transition-colors">
                Contact Us
              </a>
              
              <div className="pt-4 flex flex-col space-y-2">
                <a href="/login" className="px-4 py-2 border border-[#48A6A7] text-center text-[#48A6A7] font-medium rounded-md hover:bg-[#F2EFE7] transition-colors">
                  Login
                </a>
                
                <button 
                  onClick={() => toggleDropdown('register')}
                  className="px-4 py-2 bg-[#006A71] text-center text-white font-medium rounded-md hover:bg-[#48A6A7] transition-colors flex items-center justify-center"
                >
                  Register
                  <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === 'register' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'register' && (
                  <div className="pl-4 py-2 space-y-1">
                    <a href="/register/buyer" className="block px-3 py-2 rounded-md hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Buyer
                    </a>
                    <a href="/register/seller" className="block px-3 py-2 rounded-md hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Seller
                    </a>
                    <a href="/register/financier" className="block px-3 py-2 rounded-md hover:bg-[#F2EFE7] text-[#006A71] transition-colors">
                      Register as Financier
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}