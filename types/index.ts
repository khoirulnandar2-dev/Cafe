export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  stock: number;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  totalPrice: number;
  paymentMethod: "cod" | "dana";
  paymentStatus: "pending" | "confirmed" | "failed";
  orderStatus: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
  proofImage?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
