import { type Product, type InsertProduct, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    // Gold Jewelry Products - 10 items with multiple images each
    const goldProducts: InsertProduct[] = [
      {
        name: "Elegant Gold Necklace",
        description: "22K gold necklace with traditional design, perfect for special occasions",
        category: "gold",
        priceInr: "85000",
        priceBhd: "425",
        weight: "25g",
        stockQuantity: 5,
        imageUrls: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Traditional Gold Earrings",
        description: "Handcrafted 22K gold earrings with intricate detailing",
        category: "gold",
        priceInr: "45000",
        priceBhd: "225",
        weight: "12g",
        stockQuantity: 8,
        imageUrls: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1591348122715-fd3b3c98b5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1630019852942-f89202989e59?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Designer Gold Bracelet",
        description: "Modern 18K gold bracelet with contemporary design",
        category: "gold",
        priceInr: "35000",
        priceBhd: "175",
        weight: "15g",
        stockQuantity: 3,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1584810359583-96fc7553b6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Luxury Gold Ring",
        description: "22K gold ring with precious stones and elegant finish",
        category: "gold",
        priceInr: "65000",
        priceBhd: "325",
        weight: "8g",
        stockQuantity: 6,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Antique Gold Pendant",
        description: "Vintage-inspired 22K gold pendant with traditional motifs",
        category: "gold",
        priceInr: "28000",
        priceBhd: "140",
        weight: "6g",
        stockQuantity: 10,
        imageUrls: [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1591348122715-fd3b3c98b5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Gold Chain Set",
        description: "Complete 22K gold chain set with matching pendant",
        category: "gold",
        priceInr: "75000",
        priceBhd: "375",
        weight: "30g",
        stockQuantity: 4,
        imageUrls: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1584810359583-96fc7553b6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1630019852942-f89202989e59?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Bridal Gold Set",
        description: "Exquisite bridal jewelry set in 22K gold with precious stones",
        category: "gold",
        priceInr: "150000",
        priceBhd: "750",
        weight: "80g",
        stockQuantity: 2,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Gold Bangles Pair",
        description: "Traditional 22K gold bangles with carved patterns",
        category: "gold",
        priceInr: "95000",
        priceBhd: "475",
        weight: "45g",
        stockQuantity: 6,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1591348122715-fd3b3c98b5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Gold Nose Pin",
        description: "Delicate 18K gold nose pin with floral design",
        category: "gold",
        priceInr: "8500",
        priceBhd: "42",
        weight: "1g",
        stockQuantity: 15,
        imageUrls: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1584810359583-96fc7553b6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1630019852942-f89202989e59?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Gold Anklet",
        description: "Traditional 22K gold anklet with bell charms",
        category: "gold",
        priceInr: "42000",
        priceBhd: "210",
        weight: "20g",
        stockQuantity: 7,
        imageUrls: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
    ];

    // Silver Jewelry Products - 10 items with multiple images each
    const silverProducts: InsertProduct[] = [
      {
        name: "Modern Silver Necklace",
        description: "Sterling silver necklace with contemporary design",
        category: "silver",
        priceInr: "15000",
        priceBhd: "75",
        weight: "18g",
        stockQuantity: 12,
        imageUrls: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Artisan Silver Earrings",
        description: "Handcrafted sterling silver earrings with oxidized finish",
        category: "silver",
        priceInr: "8500",
        priceBhd: "42",
        weight: "8g",
        stockQuantity: 20,
        imageUrls: [
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Classic Silver Bracelet",
        description: "Timeless sterling silver bracelet with charm details",
        category: "silver",
        priceInr: "12000",
        priceBhd: "60",
        weight: "12g",
        stockQuantity: 8,
        imageUrls: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Contemporary Silver Ring",
        description: "Modern sterling silver ring with geometric patterns",
        category: "silver",
        priceInr: "6500",
        priceBhd: "32",
        weight: "5g",
        stockQuantity: 15,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Silver Charm Bracelet",
        description: "Sterling silver bracelet with removable charms",
        category: "silver",
        priceInr: "18000",
        priceBhd: "90",
        weight: "15g",
        stockQuantity: 10,
        imageUrls: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Silver Pendant Set",
        description: "Elegant silver pendant with matching chain",
        category: "silver",
        priceInr: "14000",
        priceBhd: "70",
        weight: "20g",
        stockQuantity: 12,
        imageUrls: [
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Oxidized Silver Jhumkas",
        description: "Traditional silver jhumka earrings with oxidized finish",
        category: "silver",
        priceInr: "7500",
        priceBhd: "37",
        weight: "10g",
        stockQuantity: 18,
        imageUrls: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Silver Toe Rings",
        description: "Set of sterling silver toe rings with carved details",
        category: "silver",
        priceInr: "4500",
        priceBhd: "22",
        weight: "3g",
        stockQuantity: 25,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Silver Cuff Bracelet",
        description: "Bold sterling silver cuff with engraved patterns",
        category: "silver",
        priceInr: "16000",
        priceBhd: "80",
        weight: "22g",
        stockQuantity: 6,
        imageUrls: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Silver Chain Collection",
        description: "Variety pack of sterling silver chains in different styles",
        category: "silver",
        priceInr: "22000",
        priceBhd: "110",
        weight: "35g",
        stockQuantity: 8,
        imageUrls: [
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
    ];

    // Diamond Jewelry Products - 10 items with multiple images each
    const diamondProducts: InsertProduct[] = [
      {
        name: "Brilliant Diamond Necklace",
        description: "18K white gold necklace with premium certified diamonds",
        category: "diamonds",
        priceInr: "250000",
        priceBhd: "1250",
        weight: "15g",
        stockQuantity: 3,
        imageUrls: [
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Classic Diamond Earrings",
        description: "Certified diamond studs in platinum setting with exceptional clarity",
        category: "diamonds",
        priceInr: "185000",
        priceBhd: "925",
        weight: "4g",
        stockQuantity: 5,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Elegant Diamond Bracelet",
        description: "Tennis bracelet with round diamonds in 18K white gold",
        category: "diamonds",
        priceInr: "320000",
        priceBhd: "1600",
        weight: "12g",
        stockQuantity: 2,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Solitaire Diamond Ring",
        description: "1 carat diamond in platinum setting with superior cut and clarity",
        category: "diamonds",
        priceInr: "450000",
        priceBhd: "2250",
        weight: "5g",
        stockQuantity: 4,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: true,
      },
      {
        name: "Diamond Pendant Set",
        description: "Heart-shaped diamond pendant with matching chain in 18K gold",
        category: "diamonds",
        priceInr: "195000",
        priceBhd: "975",
        weight: "8g",
        stockQuantity: 6,
        imageUrls: [
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Diamond Hoop Earrings",
        description: "Elegant diamond hoop earrings in 18K white gold",
        category: "diamonds",
        priceInr: "275000",
        priceBhd: "1375",
        weight: "6g",
        stockQuantity: 3,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Diamond Cluster Ring",
        description: "Multiple diamond cluster design in platinum setting",
        category: "diamonds",
        priceInr: "380000",
        priceBhd: "1900",
        weight: "7g",
        stockQuantity: 2,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Diamond Anniversary Band",
        description: "Eternity band with diamonds in 18K white gold",
        category: "diamonds",
        priceInr: "220000",
        priceBhd: "1100",
        weight: "4g",
        stockQuantity: 5,
        imageUrls: [
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Diamond Chandelier Earrings",
        description: "Statement chandelier earrings with cascading diamonds",
        category: "diamonds",
        priceInr: "420000",
        priceBhd: "2100",
        weight: "10g",
        stockQuantity: 2,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
      {
        name: "Diamond Tiara",
        description: "Bridal tiara with diamonds in 18K white gold setting",
        category: "diamonds",
        priceInr: "650000",
        priceBhd: "3250",
        weight: "25g",
        stockQuantity: 1,
        imageUrls: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isFeatured: false,
      },
    ];

    // New Arrivals Products - 10 items with multiple images each
    const newArrivalProducts: InsertProduct[] = [
      {
        name: "Contemporary Gold Pendant",
        description: "Modern geometric design in 18K gold with minimalist appeal",
        category: "new-arrivals",
        priceInr: "28000",
        priceBhd: "140",
        weight: "6g",
        stockQuantity: 8,
        imageUrls: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: true,
      },
      {
        name: "Minimalist Silver Choker",
        description: "Trendy sterling silver choker with adjustable length",
        category: "new-arrivals",
        priceInr: "9500",
        priceBhd: "47",
        weight: "10g",
        stockQuantity: 15,
        imageUrls: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: true,
      },
      {
        name: "Diamond Cluster Earrings",
        description: "Innovative cluster design with multiple diamonds in white gold",
        category: "new-arrivals",
        priceInr: "125000",
        priceBhd: "625",
        weight: "5g",
        stockQuantity: 4,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: true,
      },
      {
        name: "Fusion Mixed Metal Bangle",
        description: "Unique fusion design combining gold and silver elements",
        category: "new-arrivals",
        priceInr: "22000",
        priceBhd: "110",
        weight: "18g",
        stockQuantity: 6,
        imageUrls: [
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: true,
      },
      {
        name: "Bohemian Silver Ring",
        description: "Artistic silver ring with bohemian-inspired patterns",
        category: "new-arrivals",
        priceInr: "7500",
        priceBhd: "37",
        weight: "4g",
        stockQuantity: 12,
        imageUrls: [
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
      {
        name: "Modern Gold Chain",
        description: "Contemporary gold chain with geometric links",
        category: "new-arrivals",
        priceInr: "32000",
        priceBhd: "160",
        weight: "14g",
        stockQuantity: 9,
        imageUrls: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
      {
        name: "Delicate Diamond Ring",
        description: "Subtle diamond ring perfect for everyday wear",
        category: "new-arrivals",
        priceInr: "95000",
        priceBhd: "475",
        weight: "3g",
        stockQuantity: 7,
        imageUrls: [
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
      {
        name: "Layered Silver Necklace",
        description: "Multi-layered silver necklace for trendy styling",
        category: "new-arrivals",
        priceInr: "16500",
        priceBhd: "82",
        weight: "25g",
        stockQuantity: 11,
        imageUrls: [
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
      {
        name: "Statement Gold Earrings",
        description: "Bold gold earrings with modern architectural design",
        category: "new-arrivals",
        priceInr: "38000",
        priceBhd: "190",
        weight: "16g",
        stockQuantity: 5,
        imageUrls: [
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
      {
        name: "Infinity Diamond Pendant",
        description: "Infinity symbol pendant with diamonds in rose gold",
        category: "new-arrivals",
        priceInr: "78000",
        priceBhd: "390",
        weight: "7g",
        stockQuantity: 8,
        imageUrls: [
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        isNewArrival: true,
        isFeatured: false,
      },
    ];

    // Combine all products and create them
    const allProducts = [...goldProducts, ...silverProducts, ...diamondProducts, ...newArrivalProducts];
    
    allProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = { id, ...product };
      this.products.set(id, fullProduct);
    });
  }

  // User methods implementation
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { id, ...userData };
    this.users.set(id, user);
    return user;
  }

  // Product methods implementation
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isFeatured);
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isNewArrival);
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { id, ...productData };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new MemStorage();