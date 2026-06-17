import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    let products;

    if (category) {
      products = await prisma.product.findMany({
        where: {
          category,
          isActive: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        where: {
          isActive: true,
        },
      });
    }

    return NextResponse.json({
      message: 'Produk berhasil diambil',
      data: products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
