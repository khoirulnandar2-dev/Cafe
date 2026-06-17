'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderData {
  id: string;
  totalPrice: number;
  paymentMethod: 'cod' | 'dana';
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: string;
  notes?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Dummy data for demo
    setOrders([
      {
        id: '1',
        totalPrice: 73000,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'pending',
        items: '2x Cappuccino, 1x Iced Latte',
        notes: 'Kurangi gula',
        createdAt: '2024-01-15 10:30',
      },
      {
        id: '2',
        totalPrice: 95000,
        paymentMethod: 'dana',
        paymentStatus: 'confirmed',
        orderStatus: 'preparing',
        items: '3x Espresso, 1x Smoothie',
        createdAt: '2024-01-14 15:45',
      },
    ]);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusEmoji = (status: string) => {
    const emojis: { [key: string]: string } = {
      pending: '⏳',
      confirmed: '✓',
      preparing: '👨‍🍳',
      ready: '✓✓',
      completed: '🎉',
      cancelled: '✕',
    };
    return emojis[status] || '❓';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pesanan Saya</h1>
        <p className="text-gray-600 mt-2">Pantau status pesanan Anda</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Memuat pesanan...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-7xl mb-4">📦</div>
          <p className="text-gray-600 mb-6">Belum ada pesanan</p>
          <Link
            href="/menu"
            className="inline-block bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition"
          >
            Pesan Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Pesanan #{order.id}</h3>
                    <p className="text-gray-600 text-sm">{order.createdAt}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                    {getStatusEmoji(order.orderStatus)} {order.orderStatus}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 mb-2">{order.items}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="text-2xl font-bold text-amber-600">
                      Rp {order.totalPrice.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Pembayaran</p>
                    <p className={`px-3 py-1 rounded text-sm font-semibold ${
                      order.paymentStatus === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : order.paymentStatus === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Detail Pesanan</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Status Progress */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Status Pesanan</h4>
                  <div className="space-y-2">
                    {['pending', 'confirmed', 'preparing', 'ready', 'completed'].map((status, index) => (
                      <div key={status} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          selectedOrder.orderStatus === status || 
                          ['pending', 'confirmed', 'preparing', 'ready', 'completed'].indexOf(selectedOrder.orderStatus) >= index
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          ✓
                        </div>
                        <span className="ml-3 text-gray-700 capitalize">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pesanan</h4>
                  <p className="text-gray-700">{selectedOrder.items}</p>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Catatan</h4>
                    <p className="text-gray-700">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Payment Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Informasi Pembayaran</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span>Metode: </span>
                      <span className="font-semibold">
                        {selectedOrder.paymentMethod === 'cod' ? 'Bayar di Tempat' : 'Transfer DANA'}
                      </span>
                    </p>
                    <p>
                      <span>Status: </span>
                      <span className={`font-semibold ${
                        selectedOrder.paymentStatus === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {selectedOrder.paymentStatus === 'confirmed' ? 'Terbayar' : 'Menunggu Pembayaran'}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-amber-600">
                      Rp {selectedOrder.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {selectedOrder.orderStatus === 'ready' && (
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold">
                    ✓ Pesanan Sudah Siap
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
