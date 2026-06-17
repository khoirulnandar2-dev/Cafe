'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([
    // Demo items
    { id: '1', name: 'Cappuccino', price: 35000, quantity: 2 },
    { id: '2', name: 'Iced Latte', price: 38000, quantity: 1 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'dana'>('cod');
  const [notes, setNotes] = useState('');
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('items', JSON.stringify(cart));
      formData.append('paymentMethod', paymentMethod);
      formData.append('notes', notes);
      formData.append('totalPrice', totalPrice.toString());

      if (paymentMethod === 'dana' && proofImage) {
        formData.append('proofImage', proofImage);
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Checkout gagal');
        return;
      }

      setOrderSuccess(true);
      setTimeout(() => {
        window.location.href = '/orders';
      }, 3000);
    } catch (err) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-7xl mb-4">✓</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">Pesanan Berhasil!</h1>
          <p className="text-gray-600 mb-8">Pesanan Anda sedang diproses. Terima kasih!</p>
          <Link href="/orders" className="text-amber-600 font-semibold hover:underline">
            Lihat status pesanan →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Metode Pembayaran</h2>
              <div className="space-y-4">
                {/* COD */}
                <label className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-amber-600 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'dana')}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold text-gray-900">Bayar di Tempat (COD)</span>
                  <p className="ml-7 text-gray-600 text-sm">Bayar langsung saat barang tiba</p>
                </label>

                {/* DANA */}
                <label className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-amber-600 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="dana"
                    checked={paymentMethod === 'dana'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'dana')}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold text-gray-900">Transfer DANA</span>
                  <p className="ml-7 text-gray-600 text-sm">
                    Nomor: <strong>085609304319</strong>
                  </p>
                </label>
              </div>
            </div>

            {/* DANA Transfer Info */}
            {paymentMethod === 'dana' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">Instruksi Pembayaran DANA:</h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>Buka aplikasi DANA Anda</li>
                  <li>Pilih "Transfer"</li>
                  <li>Masukkan nomor: <strong>085609304319</strong></li>
                  <li>Masukkan jumlah: <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong></li>
                  <li>Ambil screenshot bukti transfer</li>
                  <li>Upload bukti di form di bawah</li>
                </ol>

                {/* Proof Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Upload Bukti Transfer
                  </label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                      className="w-full"
                      required
                    />
                    {proofImage && (
                      <p className="text-green-600 mt-2">✓ {proofImage.name}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Catatan Pesanan</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Tambahan gula, kurangi es, dll (opsional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (paymentMethod === 'dana' && !proofImage)}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-amber-700 transition disabled:opacity-50"
            >
              {loading ? 'Sedang memproses...' : 'Pesan Sekarang'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </div>
                  <div className="text-right text-amber-600 font-semibold">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim:</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-amber-600 pt-2 border-t">
                <span>Total:</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Link
              href="/menu"
              className="w-full block text-center mt-6 border-2 border-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
