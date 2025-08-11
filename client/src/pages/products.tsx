import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Product } from "@shared/schema";
import ProductGrid from "@/components/product-grid";
import FilterSection from "@/components/filter-section";

type SortOption = "featured" | "price-low" | "price-high" | "newest";
type PriceFilter = "all" | "low" | "medium" | "high";

export default function Products() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products based on category
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: category ? ["/api/products/category", category] : ["/api/products"],
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.priceInr);
        switch (priceFilter) {
          case "low":
            return price < 50000;
          case "medium":
            return price >= 50000 && price <= 100000;
          case "high":
            return price > 100000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.priceInr) - parseFloat(b.priceInr);
        case "price-high":
          return parseFloat(b.priceInr) - parseFloat(a.priceInr);
        case "newest":
          return b.isNewArrival ? 1 : -1;
        case "featured":
        default:
          return b.isFeatured ? 1 : -1;
      }
    });

    return sorted;
  }, [products, searchQuery, priceFilter, sortBy]);

  const getCategoryTitle = () => {
    switch (category) {
      case "gold":
        return "Gold Jewelry Collection";
      case "silver":
        return "Silver Jewelry Collection";
      case "diamonds":
        return "Diamond Jewelry Collection";
      case "new-arrivals":
        return "New Arrivals";
      default:
        return "All Products";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case "gold":
        return "Discover our exquisite gold jewelry crafted with precision";
      case "silver":
        return "Elegant silver pieces for every occasion";
      case "diamonds":
        return "Brilliant diamonds that capture light and hearts";
      case "new-arrivals":
        return "Discover our latest jewelry collections";
      default:
        return "Browse our complete collection of luxury jewelry";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">
            {getCategoryTitle()}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {getCategoryDescription()}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="search-products"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-black">Filter Products</h3>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="filter-price"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹50,000</option>
                <option value="medium">₹50,000 - ₹1,00,000</option>
                <option value="high">Above ₹1,00,000</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                data-testid="sort-products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedProducts.length > 0 ? (
            <ProductGrid 
              products={filteredAndSortedProducts} 
              showNewBadge={category === "new-arrivals"} 
            />
          ) : (
            <div className="text-center py-16">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
