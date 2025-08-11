export default function CategoryNav() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a 
            href="/products/gold" 
            className="group text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            data-testid="category-gold"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <i className="fas fa-ring text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-black group-hover:text-gold transition-colors">Gold Jewelry</h3>
            <p className="text-sm text-gray-600 mt-2">Premium gold collections</p>
          </a>

          <a 
            href="/products/silver" 
            className="group text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            data-testid="category-silver"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <i className="fas fa-gem text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-black group-hover:text-gold transition-colors">Silver Jewelry</h3>
            <p className="text-sm text-gray-600 mt-2">Elegant silver pieces</p>
          </a>

          <a 
            href="/products/diamonds" 
            className="group text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            data-testid="category-diamonds"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <i className="far fa-gem text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-black group-hover:text-gold transition-colors">Diamonds</h3>
            <p className="text-sm text-gray-600 mt-2">Brilliant diamond jewelry</p>
          </a>

          <a 
            href="/products/new-arrivals" 
            className="group text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            data-testid="category-new-arrivals"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <i className="fas fa-star text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-black group-hover:text-gold transition-colors">New Arrivals</h3>
            <p className="text-sm text-gray-600 mt-2">Latest collections</p>
          </a>
        </div>
      </div>
    </section>
  );
}
