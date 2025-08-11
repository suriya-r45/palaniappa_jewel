import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "INR" | "BHD";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (priceInr: string, priceBhd: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>("INR");

  const toggleCurrency = () => {
    setCurrency(prev => prev === "INR" ? "BHD" : "INR");
  };

  const formatPrice = (priceInr: string, priceBhd: string) => {
    if (currency === "INR") {
      return `₹${parseFloat(priceInr).toLocaleString('en-IN')}`;
    } else {
      return `BHD ${parseFloat(priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 2 })}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
