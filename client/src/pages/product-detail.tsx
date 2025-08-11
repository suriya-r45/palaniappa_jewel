import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCurrency } from "@/hooks/use-currency";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { openWhatsApp } from "@/lib/whatsapp";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { currency, formatPrice } = useCurrency();
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gold text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
            data-testid="back-to-products"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppEnquiry = () => {
    const price = formatPrice(product.priceInr, product.priceBhd);
    openWhatsApp(product.name, price, product.description);
  };

  const handleAddToCart = () => {
    if (product.stockQuantity === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gold transition-colors" data-testid="breadcrumb-home">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-gold transition-colors" data-testid="breadcrumb-products">Products</a>
          <span>/</span>
          <a href={`/products/${product.category}`} className="hover:text-gold transition-colors" data-testid="breadcrumb-category">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </a>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={product.imageUrls[selectedImageIndex] || product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                data-testid="product-main-image"
              />
            </div>

            {/* Thumbnail Images */}
            {product.imageUrls.length > 1 && (
              <div className="flex justify-center space-x-4 overflow-x-auto">
                {product.imageUrls.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-gold" : "border-gray-200"
                    }`}
                    data-testid={`product-thumbnail-${index}`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Name and New Badge */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-playfair font-bold text-black" data-testid="product-name">
                  {product.name}
                </h1>
                {product.isNewArrival && (
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mt-2">
                    New Arrival
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black" data-testid="product-price">
                {formatPrice(product.priceInr, product.priceBhd)}
              </div>
              <div className="text-sm text-gray-500">
                {currency === "INR" ? `BHD ${product.priceBhd}` : `₹${product.priceInr}`}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${stockStatus.className}`}>
                {stockStatus.text}
              </span>
              {product.stockQuantity > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {product.stockQuantity} pieces available
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              {product.weight && (
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">Weight</h3>
                  <p className="text-gray-600" data-testid="product-weight">{product.weight}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Category</h3>
                <p className="text-gray-600 capitalize" data-testid="product-category">{product.category}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="decrease-quantity"
                  >
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <span className="text-xl font-semibold px-4" data-testid="quantity-display">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="increase-quantity"
                  >
                    <i className="fas fa-plus text-sm"></i>
                  </button>
                  <span className="text-sm text-gray-500 ml-4">
                    {product.stockQuantity} available
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-md font-semibold transition-colors ${
                  product.stockQuantity === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isInCart(product.id)
                      ? 'bg-gold text-white hover:bg-yellow-600'
                      : 'bg-gold text-white hover:bg-yellow-600'
                }`}
                data-testid="add-to-cart-button"
              >
                <i className={`fas ${isInCart(product.id) ? 'fa-check' : 'fa-shopping-cart'} text-xl`}></i>
                <span>{product.stockQuantity === 0 ? 'Out of Stock' : isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>
              
              <button
                onClick={handleWhatsAppEnquiry}
                disabled={product.stockQuantity === 0}
                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-md font-semibold transition-colors ${
                  product.stockQuantity === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                data-testid="whatsapp-enquiry"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Enquire on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-semibold"
                  data-testid="back-to-catalog"
                >
                  Back to Catalog
                </button>
                <button
                  onClick={() => navigate(`/products/${product.category}`)}
                  className="bg-gold text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors font-semibold"
                  data-testid="view-similar"
                >
                  View Similar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-playfair font-bold text-black mb-6">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <i className="fas fa-certificate text-3xl text-gold mb-4"></i>
              <h3 className="font-semibold text-black mb-2">Certified Quality</h3>
              <p className="text-sm text-gray-600">All our jewelry is certified for quality and authenticity</p>
            </div>
            <div className="text-center">
              <i className="fas fa-shipping-fast text-3xl text-gold mb-4"></i>
              <h3 className="font-semibold text-black mb-2">Shipping Information</h3>
              <p className="text-sm text-gray-600">Secure delivery to India and Bahrain. Shipping costs calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
