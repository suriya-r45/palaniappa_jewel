import { useState } from "react";
import { useCurrency } from "@/hooks/use-currency";
import logoPath from "@assets/1000284180_1754917213241.jpg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currency, toggleCurrency } = useCurrency();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3" data-testid="header-logo">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold">
              <img 
                src={logoPath} 
                alt="Palaniappa Jewellers Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-playfair font-bold text-black">PALANIAPPA JEWELLERS</h1>
              <p className="text-sm text-gray-600">Since 2025</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => window.location.href = "/"}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => window.location.href = "/products/gold"}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-gold"
            >
              Gold
            </button>
            <button 
              onClick={() => window.location.href = "/products/silver"}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-silver"
            >
              Silver
            </button>
            <button 
              onClick={() => window.location.href = "/products/diamonds"}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-diamonds"
            >
              Diamonds
            </button>
            <button 
              onClick={() => window.location.href = "/products/new-arrivals"}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-new-arrivals"
            >
              New Arrivals
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-gold transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* Currency Dropdown & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Currency Dropdown */}
            <div className="hidden sm:block relative">
              <select
                value={currency}
                onChange={(e) => {
                  if (e.target.value !== currency) {
                    toggleCurrency();
                  }
                }}
                className="appearance-none bg-white border border-gray-300 rounded-md px-8 py-2 pr-10 text-sm hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="currency-dropdown"
              >
                <option value="INR">🇮🇳 INR</option>
                <option value="BHD">🇧🇭 BHD</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </div>
            </div>
            
            {/* Admin Link */}
            <a
              href="/admin"
              className="hidden sm:flex items-center text-sm text-gray-600 hover:text-gold transition-colors"
              data-testid="admin-link"
            >
              <i className="fas fa-cog mr-1"></i>
              Admin
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              data-testid="mobile-menu-toggle"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-gray-700`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => { window.location.href = "/"; setIsMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => { window.location.href = "/products/gold"; setIsMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                Gold
              </button>
              <button 
                onClick={() => { window.location.href = "/products/silver"; setIsMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                Silver
              </button>
              <button 
                onClick={() => { window.location.href = "/products/diamonds"; setIsMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                Diamonds
              </button>
              <button 
                onClick={() => { window.location.href = "/products/new-arrivals"; setIsMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                New Arrivals
              </button>
              <button 
                onClick={() => { scrollToSection("contact"); }}
                className="text-left text-gray-700 hover:text-gold transition-colors"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm text-gray-600 mb-2">Currency:</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    if (e.target.value !== currency) {
                      toggleCurrency();
                    }
                  }}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <option value="INR">🇮🇳 Indian Rupee (INR)</option>
                  <option value="BHD">🇧🇭 Bahraini Dinar (BHD)</option>
                </select>
              </div>
              <a
                href="/admin"
                className="flex items-center text-sm text-gray-600 hover:text-gold transition-colors pt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-cog mr-2"></i>
                Admin Panel
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
