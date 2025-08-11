import HeroCarousel from "@/components/hero-carousel";
import CategoryNav from "@/components/category-nav";
import ProductGrid from "@/components/product-grid";
import FilterSection from "@/components/filter-section";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/featured/all"],
  });

  const goldProducts = featuredProducts.filter(p => p.category === "gold");
  const silverProducts = featuredProducts.filter(p => p.category === "silver");
  const diamondProducts = featuredProducts.filter(p => p.category === "diamonds");
  const newArrivals = featuredProducts.filter(p => p.category === "new-arrivals");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-black mb-6">
              Exquisite Jewelry Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our stunning collection of gold, silver, and diamond jewelry crafted with precision and love. From India to Bahrain, we bring you the finest pieces.
            </p>
          </div>

          <HeroCarousel />
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav />

      {/* Filter Section */}
      <FilterSection />

      {/* Gold Jewelry Section */}
      <section id="gold" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">Gold Jewelry Collection</h2>
            <p className="text-lg text-gray-600">Discover our exquisite gold jewelry crafted with precision</p>
          </div>
          
          <ProductGrid products={goldProducts} />
          
          <div className="text-center mt-12">
            <a 
              href="/products/gold"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-block"
              data-testid="view-all-gold"
            >
              View All Gold Jewelry
            </a>
          </div>
        </div>
      </section>

      {/* Silver Jewelry Section */}
      <section id="silver" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">Silver Jewelry Collection</h2>
            <p className="text-lg text-gray-600">Elegant silver pieces for every occasion</p>
          </div>
          
          <ProductGrid products={silverProducts} />
          
          <div className="text-center mt-12">
            <a 
              href="/products/silver"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-block"
              data-testid="view-all-silver"
            >
              View All Silver Jewelry
            </a>
          </div>
        </div>
      </section>

      {/* Diamonds Section */}
      <section id="diamonds" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">Diamond Jewelry Collection</h2>
            <p className="text-lg text-gray-600">Brilliant diamonds that capture light and hearts</p>
          </div>
          
          <ProductGrid products={diamondProducts} />
          
          <div className="text-center mt-12">
            <a 
              href="/products/diamonds"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-block"
              data-testid="view-all-diamonds"
            >
              View All Diamond Jewelry
            </a>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="new-arrivals" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">New Arrivals</h2>
            <p className="text-lg text-gray-600">Discover our latest jewelry collections</p>
          </div>
          
          <ProductGrid products={newArrivals} showNewBadge={true} />
          
          <div className="text-center mt-12">
            <a 
              href="/products/new-arrivals"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors inline-block"
              data-testid="view-all-new-arrivals"
            >
              View All New Arrivals
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Visit Our Stores</h2>
            <p className="text-lg text-gray-300">Experience our collections at our locations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Indian Store */}
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-map-marker-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-4">India Store</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-lg">Salem, Tamil Nadu</p>
                <p>India</p>
              </div>
            </div>

            {/* Bahrain Store */}
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-map-marker-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Bahrain Store</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-lg">Gold City, Manama</p>
                <p>Kingdom of Bahrain</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <i className="fas fa-phone text-gold"></i>
                <span className="text-lg">+919597201554</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <i className="fas fa-envelope text-gold"></i>
                <span className="text-lg">jewelerypalaniappa@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
