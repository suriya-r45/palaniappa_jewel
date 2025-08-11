export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Palaniappa Jewellers</h3>
            <p className="text-gray-300 mb-4">Since 2025</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Luxury jewelry crafted with precision and heritage, serving customers in India and Bahrain.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Contact Info</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <i className="fas fa-phone mr-2"></i>
                +91 9597 201 554
              </p>
              <p className="text-gray-300 text-sm">
                <i className="fas fa-envelope mr-2"></i>
                jewelerypalaniappa@gmail.com
              </p>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold">Locations</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium">India</h4>
                <p className="text-gray-300 text-sm">Salem, Tamil Nadu</p>
              </div>
              <div>
                <h4 className="text-white font-medium">Bahrain</h4>
                <p className="text-gray-300 text-sm">Gold City, Manama</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Palaniappa Jewellers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}