'use client';

import { Product } from '@/types';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      {product.image ? (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
          <span className="text-6xl">☕</span>
        </div>
      )}

      <div className="p-4">
        <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
          {product.category}
        </span>
        <h3 className="text-lg font-bold mt-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-amber-600">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
          </span>
        </div>

        {product.stock > 0 && (
          <div className="mt-4 flex gap-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-center"
            />
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition font-semibold"
            >
              + Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
