'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Dummy data - nanti akan fetch dari API
    const dummyProducts: Product[] = [
      {
        id: '1',
        name: 'Espresso',
        category: 'Kopi',
        price: 25000,
        description: 'Kopi murni dengan rasa yang kuat dan pekat',
        stock: 10,
        isActive: true,
      },
      {
        id: '2',
        name: 'Cappuccino',
        category: 'Kopi',
        price: 35000,
        description: 'Kopi dengan busa susu yang lembut',
        stock: 15,
        isActive: true,
      },
      {
        id: '3',
        name: 'Latte',
        category: 'Kopi',
        price: 35000,
        description: 'Kopi dengan banyak susu yang creamy',
        stock: 12,
        isActive: true,
      },
      {
        id: '4',
        name: 'Americano',
        category: 'Kopi',
        price: 28000,
        description: 'Espresso dengan air panas',
        stock: 20,
        isActive: true,
      },
      {
        id: '5',
        name: 'Iced Coffee',
        category: 'Kopi Dingin',
        price: 32000,
        description: 'Kopi dingin yang menyegarkan',
        stock: 8,
        isActive: true,
      },
      {
        id: '6',
        name: 'Iced Latte',
        category: 'Kopi Dingin',
        price: 38000,
        description: 'Latte dengan es batu',
        stock: 10,
        isActive: true,
      },
      {
        id: '7',
        name: 'Smoothie Mangga',
        category: 'Minuman Segar',
        price: 30000,
        description: 'Smoothie buah mangga yang segar',
        stock: 5,
        isActive: true,
      },
      {
        id: '8',
        name: 'Teh Herbal',
        category: 'Minuman Segar',
        price: 25000,
        description: 'Teh herbal pilihan yang menyehat',
        stock: 12,
        isActive: true,
      },
    ];

    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Menu Kami</h1>
          <p className="text-gray-600 mt-2">Pilih kopi atau minuman favorit Anda</p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          🛒 Keranjang
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Kategori */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Kategori</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Produk */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-amber-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-2xl hover:text-amber-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Keranjang Anda kosong</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="border-b pb-4 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                          <p className="text-gray-600 text-sm">
                            Rp {item.product.price.toLocaleString('id-ID')} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600">
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-amber-600">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowCart(false);
                        // TODO: Navigate to checkout
                      }}
                      className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition"
                    >
                      Lanjut ke Pembayaran
                    </button>
                    <button
                      onClick={() => setShowCart(false)}
                      className="w-full border-2 border-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      Lanjut Belanja
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
