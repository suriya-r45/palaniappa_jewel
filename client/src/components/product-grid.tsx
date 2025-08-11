import { Product } from "@shared/schema";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  showNewBadge?: boolean;
}

export default function ProductGrid({ products, showNewBadge = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <i className="fas fa-gem text-4xl text-gray-400 mb-4"></i>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No products available</h3>
        <p className="text-gray-600">Check back later for new additions to our collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showNewBadge={showNewBadge}
        />
      ))}
    </div>
  );
}
