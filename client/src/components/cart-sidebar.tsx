import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useCurrency } from "@/hooks/use-currency";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  children: React.ReactNode;
}

export default function CartSidebar({ children }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { currency, formatPrice } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    // For demo purposes, show alert. In production, this would redirect to checkout
    alert("Checkout functionality would be implemented here. Contact us via WhatsApp for orders!");
    setIsOpen(false);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice(currency);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative" data-testid="cart-trigger">
          {children}
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-gold text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center"
              data-testid="cart-badge"
            >
              {totalItems}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <i className="fas fa-shopping-bag text-gold"></i>
            <span>Shopping Cart</span>
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 
              ? "Your cart is empty" 
              : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {totalItems === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <i className="fas fa-shopping-bag text-6xl text-gray-300"></i>
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mt-1">Add some beautiful jewelry to get started!</p>
              </div>
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-gold hover:bg-gold/90 text-white"
                data-testid="continue-shopping"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-3" data-testid={`cart-item-${item.product.id}`}>
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-black truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.product.priceInr, item.product.priceBhd)}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-400">Size: {item.selectedSize}</p>
                      )}
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          data-testid={`decrease-quantity-${item.product.id}`}
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="text-sm font-medium px-2" data-testid={`quantity-${item.product.id}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          data-testid={`increase-quantity-${item.product.id}`}
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      data-testid={`remove-item-${item.product.id}`}
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-gold" data-testid="cart-total">
                    {formatPrice(totalPrice.toString(), totalPrice.toString())}
                  </span>
                </div>
                
                <Separator />
                
                {/* Checkout Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gold hover:bg-gold/90 text-white"
                    data-testid="checkout-button"
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="w-full"
                    data-testid="continue-shopping-button"
                  >
                    Continue Shopping
                  </Button>
                </div>
                
                {/* Contact Note */}
                <div className="text-center text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                  <i className="fas fa-info-circle mr-1"></i>
                  For assistance, contact us at +919597201554 or via WhatsApp
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}