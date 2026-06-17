import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cafe Shop - Kopi Terbaik",
  description: "Toko kopi online dengan berbagai pilihan minuman dan makanan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Cafe Shop</h3>
                <p className="text-gray-400">Menyediakan kopi terbaik untuk Anda setiap hari</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Kontak</h3>
                <p className="text-gray-400">WhatsApp: 085609304319</p>
                <p className="text-gray-400">Email: info@cafeshop.com</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
                <p className="text-gray-400">Senin - Minggu</p>
                <p className="text-gray-400">08:00 - 22:00</p>
              </div>
            </div>
            <hr className="my-6 border-gray-700" />
            <p className="text-center text-gray-400">&copy; 2024 Cafe Shop. Semua hak dilindungi.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
