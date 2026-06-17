import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-7xl mb-4">☕</div>
          <h1 className="text-5xl font-bold mb-4">Selamat Datang di Cafe Shop</h1>
          <p className="text-xl mb-8 text-amber-100">
            Kopi terbaik dan makanan lezat disiapkan khusus untuk Anda
          </p>
          <Link
            href="/menu"
            className="inline-block bg-amber-400 text-amber-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-300 transition"
          >
            Lihat Menu Kami
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🫘</div>
              <h3 className="text-xl font-bold mb-2">Biji Kopi Berkualitas</h3>
              <p className="text-gray-600">
                Kami hanya menggunakan biji kopi pilihan dari petani terpercaya
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold mb-2">Barista Profesional</h3>
              <p className="text-gray-600">
                Setiap minuman dibuat oleh barista bersertifikat dengan sempurna
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600">
                Pesan sekarang dan terima pesanan Anda dalam waktu singkat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Siap untuk Mencoba Kopi Terbaik?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Pesan sekarang dan nikmati pengalaman minum kopi yang tak terlupakan
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/menu"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition"
            >
              Pesan Sekarang
            </Link>
            <Link
              href="/login"
              className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Menu Populer Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Espresso', emoji: '☕' },
              { name: 'Cappuccino', emoji: '🥛' },
              { name: 'Latte', emoji: '☕' },
              { name: 'Americano', emoji: '☕' },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-amber-50 rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-3">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-amber-600 font-semibold mt-2">Mulai dari Rp 25.000</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
