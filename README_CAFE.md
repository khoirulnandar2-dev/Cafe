# ☕ Cafe Shop - Online Coffee Store

Website toko kopi online seperti Fore Coffee dengan fitur login, manajemen menu, sistem transaksi pembayaran, dan dashboard admin.

## 🚀 Tech Stack

- **Framework**: Next.js 16 dengan TypeScript
- **Frontend**: React 19 + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Authentication**: NextAuth.js
- **Security**: bcryptjs untuk password hashing
- **Styling**: Tailwind CSS v4 + Custom CSS Components

## 📋 Fitur Utama

### 1. **Landing Page** (`/`)
- ☕ Hero section dengan call-to-action
- 🎯 Fitur unggulan toko
- 📱 Preview menu populer
- 🔗 Link untuk login/daftar

### 2. **Sistem Autentikasi**
- **Register** (`/register`) - Daftar akun baru
- **Login** (`/login`) - Masuk dengan role (Customer/Admin)
- 🔒 Password encryption dengan bcryptjs
- 👥 Role-based access (Customer vs Admin)

### 3. **Menu & Katalog** (`/menu`)
- ☕ Tampilkan semua produk kopi
- 🏷️ Filter berdasarkan kategori
- 📋 Detail produk (nama, harga, stok, deskripsi)
- 📱 Responsive grid layout
- ✨ Hover effects dan smooth transitions

### 4. **Shopping Cart & Checkout**
- 🛒 Tambah produk ke keranjang
- 📝 Review pesanan sebelum checkout
- 💳 Dua metode pembayaran:
  - **COD (Cash on Delivery)**: Bayar di tempat
  - **DANA Transfer**: Dengan upload bukti transfer
- 📌 Catatan pesanan custom

### 5. **Order Management** (`/orders`)
- 📦 Lihat riwayat pesanan
- ⏳ Track status pesanan real-time
- 📊 Visual progress indicator
- 💰 Payment status tracking

### 6. **Admin Dashboard** (`/admin/dashboard`)
- 📋 Kelola semua pesanan masuk
- 🔍 Filter berdasarkan status
- 📸 Lihat detail pesanan dan bukti pembayaran
- ✏️ Update status pesanan
- ✓ Konfirmasi pembayaran DANA

## 🎨 Styling & Components

### Tailwind CSS v4 Setup
```css
/* globals.css */
@import "tailwindcss";

@layer base {
  /* Base styles */
}

@layer components {
  .btn-primary { /* styling */ }
  .card { /* styling */ }
  .input-field { /* styling */ }
}

@layer utilities {
  .grid-responsive { /* styling */ }
  .shadow-soft { /* styling */ }
}
```

### Custom Components
- `.btn-primary` - Tombol utama (amber-600)
- `.btn-secondary` - Tombol sekunder (gray border)
- `.card` - Card container dengan shadow
- `.input-field` - Input form styling terpadu

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- ✅ Grid responsive untuk product listing
- ✅ Sticky sidebar pada desktop
- ✅ Mobile menu toggle di navbar

### Color Scheme
| Warna | Usage | Hex |
|-------|-------|-----|
| Amber | Primary (Coffee) | #b5977a |
| Gray | Secondary | #6b7280 |
| Green | Success | #10b981 |
| Red | Danger | #ef4444 |
| Yellow | Warning | #eab308 |
| Blue | Info | #3b82f6 |

### Typography
- **Font Family**: Geist Sans (default), Geist Mono (code)
- **Smooth Scroll**: `scroll-behavior: smooth`
- **Consistent Spacing**: Tailwind scale (0.25rem = 4px)

## 📁 Struktur Folder

```
Cafe/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/page.tsx         # Login form
│   │   └── register/page.tsx      # Register form
│   ├── (customer)/                # Customer routes
│   │   ├── menu/page.tsx          # Menu & products catalog
│   │   ├── orders/page.tsx        # Order tracking
│   │   └── checkout/page.tsx      # Checkout & payment
│   ├── (admin)/                   # Admin routes
│   │   └── dashboard/page.tsx     # Admin dashboard
│   ├── api/                       # API endpoints
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── products/route.ts
│   │   └── orders/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── layout.tsx                 # Root layout + Navbar + Footer
│   ├── page.tsx                   # Homepage
│   └── globals.css                # Global styles + Tailwind
├── components/                    # Reusable React components
│   ├── Navbar.tsx                 # Navigation bar
│   └── ProductCard.tsx            # Product card component
├── lib/                           # Utility functions
│   └── prisma.ts                  # Prisma client singleton
├── types/                         # TypeScript types
│   └── index.ts                   # Type definitions
├── prisma/                        # Database configuration
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration files
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind configuration
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

## 🗄️ Database Schema (Prisma)

### User Model
```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String
  password  String     # hashed
  role      String     # "admin" atau "customer"
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  orders    Order[]
}
```

### Product Model
```prisma
model Product {
  id          String     @id @default(cuid())
  name        String
  category    String
  price       Int        # dalam rupiah
  image       String?
  description String?
  stock       Int        @default(10)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  orderItems  OrderItem[]
}
```

### Order Model
```prisma
model Order {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  totalPrice    Int        # dalam rupiah
  paymentMethod String     # "cod" atau "dana"
  paymentStatus String     # "pending", "confirmed", "failed"
  orderStatus   String     # "pending", "confirmed", "preparing", "ready", "completed", "cancelled"
  
  proofImage    String?    # URL bukti transfer
  notes         String?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  items         OrderItem[]
}
```

### OrderItem Model
```prisma
model OrderItem {
  id        String     @id @default(cuid())
  orderId   String
  order     Order      @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId String
  product   Product    @relation(fields: [productId], references: [id])
  
  quantity  Int
  price     Int        # harga saat pemesanan
  
  @@unique([orderId, productId])
}
```

## 🔐 Security Features

1. **Password Hashing**: bcryptjs dengan salt rounds = 10
2. **Role-Based Access**: Admin vs Customer separation
3. **Environment Variables**: `.env.local` untuk secrets
4. **Type Safety**: TypeScript strict mode
5. **Input Validation**: Server-side validation di API routes
6. **CORS Protection**: Next.js API routes built-in
7. **SQL Injection Prevention**: Prisma prepared statements

## 🚀 Installation & Setup

### 1. Clone dan Install Dependencies
```bash
cd /workspaces/Cafe
npm install
```

### 2. Setup Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally
# Create database
createdb cafe_db

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/cafe_db"
```

**Option B: Online Database**
```
# Gunakan Neon.tech, Supabase, atau Railway
DATABASE_URL="postgresql://user:password@host/database"
```

### 3. Setup Prisma
```bash
# Generate Prisma client
npx prisma generate

# Jalankan migrations
npx prisma migrate dev
```

### 4. Seed Demo Data (Optional)
```bash
# Buat seed script untuk demo products dan users
```

### 5. Development Server
```bash
npm run dev
```

Server berjalan di: [http://localhost:3000](http://localhost:3000)

### 6. Production Build
```bash
npm run build
npm start
```

## 📝 Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cafe_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"

# Payment
DANA_PHONE="085609304319"
```

## 👤 Demo Credentials

### Customer Account
- **Email**: `customer@test.com`
- **Password**: `password`

### Admin Account
- **Email**: `admin@test.com`
- **Password**: `password`

## 📱 Responsive Breakpoints

| Device | Width | Grid | Sidebar |
|--------|-------|------|---------|
| Mobile | < 640px | 1 col | Full width |
| Tablet | 640px - 1024px | 2 cols | Side by side |
| Desktop | > 1024px | 3-4 cols | Fixed sticky |

## 🎯 Fitur yang Bisa Ditambahkan

- [ ] 🔔 Notifikasi WhatsApp/Email otomatis
- [ ] 🎨 Custom menu options (ukuran, kemanisan, add-ons)
- [ ] 🚚 Pilihan pick-up vs delivery
- [ ] ⭐ Sistem rating & review produk
- [ ] 📊 Dashboard analytics untuk admin
- [ ] 📄 Export invoice PDF
- [ ] 🔐 QR code untuk pickup verification
- [ ] 💳 Integrasi payment gateway (Midtrans, Stripe)
- [ ] 📍 Google Maps integration untuk location
- [ ] 🤖 Chatbot customer service

## 🛠️ Development Tools

- **ESLint**: Code linting & quality
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Next-generation ORM
- **Next.js**: React framework for production

## 📄 File-File Penting

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Tailwind CSS configuration |
| `app/globals.css` | Global styles & Tailwind imports |
| `postcss.config.mjs` | PostCSS configuration |
| `prisma/schema.prisma` | Database schema definition |
| `.env.local` | Environment variables (git ignored) |
| `tsconfig.json` | TypeScript configuration |

## 🌐 Deployment Options

- **Vercel**: Recommended (built by Next.js creators)
- **Netlify**: Good alternative
- **Railway**: With PostgreSQL support
- **Heroku**: Classic option (paid)
- **AWS**: Scalable but complex

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma ORM Guide](https://www.prisma.io/docs/)
- [React 19 Features](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - Open source untuk pembelajaran dan penggunaan komersial

---

**Made with ☕ for coffee lovers**
