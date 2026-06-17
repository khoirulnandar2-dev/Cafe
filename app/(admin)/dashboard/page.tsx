'use client';

import { useState, useEffect } from 'react';

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  paymentMethod: 'cod' | 'dana';
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: string;
  proofImage?: string;
  notes?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dummy data
    setOrders([
      {
        id: '1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
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
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        totalPrice: 95000,
        paymentMethod: 'dana',
        paymentStatus: 'confirmed',
        orderStatus: 'preparing',
        items: '3x Espresso, 1x Smoothie',
        proofImage: 'https://example.com/proof.jpg',
        createdAt: '2024-01-15 11:45',
      },
    ]);
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus === filter);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Gagal mengubah status');
        return;
      }

      // Update order status locally
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, orderStatus: newStatus as any } : order
      ));

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus as any });
      }
    } catch (err) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirm = async (orderId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ paymentStatus: 'confirmed' }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Gagal mengkonfirmasi pembayaran');
        return;
      }

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, paymentStatus: 'confirmed' } : order
      ));

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, paymentStatus: 'confirmed' });
      }
    } catch (err) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Filters */}
              <div className="border-b p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan</h2>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilter(status as any)}
                      className={`px-4 py-2 rounded transition ${
                        filter === status
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? 'Semua' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-semibold text-gray-900">{order.customerName}</div>
                          <div className="text-gray-600">{order.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-amber-600">
                          Rp {order.totalPrice.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-amber-600 hover:underline font-semibold"
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Detail Pesanan</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Customer Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Informasi Pelanggan</h4>
                  <p className="text-gray-700">{selectedOrder.customerName}</p>
                  <p className="text-gray-600">{selectedOrder.customerEmail}</p>
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

                {/* Payment Method */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h4>
                  <p className="text-gray-700">
                    {selectedOrder.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : 'Transfer DANA'}
                  </p>
                </div>

                {/* Proof Image */}
                {selectedOrder.proofImage && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bukti Transfer</h4>
                    <img src={selectedOrder.proofImage} alt="Bukti transfer" className="max-w-full rounded" />
                  </div>
                )}

                {/* Payment Status */}
                {selectedOrder.paymentMethod === 'dana' && selectedOrder.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handlePaymentConfirm(selectedOrder.id)}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                  >
                    ✓ Konfirmasi Pembayaran
                  </button>
                )}

                {/* Order Status */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ubah Status Pesanan</h4>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    disabled={loading}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="pending">Menunggu</option>
                    <option value="confirmed">Dikonfirmasi</option>
                    <option value="preparing">Sedang Dibuat</option>
                    <option value="ready">Siap Diambil</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
