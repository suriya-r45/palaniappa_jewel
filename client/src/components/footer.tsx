import logoPath from "@assets/1000284180_1754917213241.jpg";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold">
                <img 
                  src={logoPath} 
                  alt="Palaniappa Jewellers Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-playfair font-bold">PALANIAPPA JEWELLERS</h3>
                <p className="text-sm text-gray-400">Since 2025</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Crafting exquisite jewelry with precision and love. From traditional to contemporary designs, we bring you the finest collections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products/gold" className="hover:text-gold transition-colors" data-testid="footer-gold">Gold Jewelry</a></li>
              <li><a href="/products/silver" className="hover:text-gold transition-colors" data-testid="footer-silver">Silver Jewelry</a></li>
              <li><a href="/products/diamonds" className="hover:text-gold transition-colors" data-testid="footer-diamonds">Diamonds</a></li>
              <li><a href="/products/new-arrivals" className="hover:text-gold transition-colors" data-testid="footer-new-arrivals">New Arrivals</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <i className="fas fa-phone text-gold"></i>
                <span>+919597201554</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-envelope text-gold"></i>
                <span>jewelerypalaniappa@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fab fa-whatsapp text-gold"></i>
                <span>WhatsApp Enquiry</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Palaniappa Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
