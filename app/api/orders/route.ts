import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const items = JSON.parse(formData.get('items') as string);
    const paymentMethod = formData.get('paymentMethod') as string;
    const totalPrice = parseInt(formData.get('totalPrice') as string);
    const notes = formData.get('notes') as string;
    const proofImage = formData.get('proofImage') as File;

    // Get user from token (TODO: implement JWT verification)
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      return NextResponse.json(
        { message: 'Anda harus login terlebih dahulu' },
        { status: 401 }
      );
    }

    // Create order with Prisma
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice,
        paymentMethod: paymentMethod as 'cod' | 'dana',
        paymentStatus: 'pending',
        orderStatus: 'pending',
        notes,
        // proofImage: uploadedImageUrl, // TODO: Implement image upload
      },
    });

    // Create order items
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        },
      });
    }

    return NextResponse.json(
      {
        message: 'Pesanan berhasil dibuat',
        orderId: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all orders (admin only)
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      message: 'Pesanan berhasil diambil',
      data: orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
