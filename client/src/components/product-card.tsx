import { Product } from "@shared/schema";
import { useCurrency } from "@/hooks/use-currency";
import { openWhatsApp } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  showNewBadge?: boolean;
}

export default function ProductCard({ product, showNewBadge = false }: ProductCardProps) {
  const { formatPrice } = useCurrency();

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price = formatPrice(product.priceInr, product.priceBhd);
    openWhatsApp(product.name, price, product.description);
  };

  const handleViewDetails = () => {
    window.location.href = `/product/${product.id}`;
  };

  const getStockStatus = () => {
    if (product.stockQuantity === 0) {
      return { text: "Out of Stock", className: "bg-red-100 text-red-800" };
    } else if (product.stockQuantity <= 5) {
      return { text: "Limited Stock", className: "bg-yellow-100 text-yellow-800" };
    } else {
      return { text: "In Stock", className: "bg-green-100 text-green-800" };
    }
  };

  const stockStatus = getStockStatus();

  const getButtonColor = () => {
    switch (product.category) {
      case "gold":
        return "bg-gold hover:bg-yellow-600";
      case "silver":
        return "bg-gray-600 hover:bg-gray-700";
      case "diamonds":
        return "bg-blue-600 hover:bg-blue-700";
      case "new-arrivals":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-gold hover:bg-yellow-600";
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
      {/* New Badge */}
      {showNewBadge && product.isNewArrival && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          New
        </div>
      )}
      
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          data-testid={`product-image-${product.id}`}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-black mb-2" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2" data-testid={`product-description-${product.id}`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-black" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.priceInr, product.priceBhd)}
            </span>
            {product.weight && (
              <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
            )}
          </div>
          <span 
            className={`text-sm px-2 py-1 rounded-full ${stockStatus.className}`}
            data-testid={`product-stock-${product.id}`}
          >
            {stockStatus.text}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            data-testid={`view-product-${product.id}`}
          >
            View Details
          </button>
          <button
            onClick={handleWhatsAppEnquiry}
            disabled={product.stockQuantity === 0}
            className={`py-2 px-4 rounded-md transition-colors ${
              product.stockQuantity === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            data-testid={`whatsapp-enquiry-${product.id}`}
          >
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
