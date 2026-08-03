import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const menuItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category,
        description: body.description,
        price: body.price,
        image: body.image,
        isAvailable: body.isAvailable ?? true,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error ) {
    return NextResponse.json({ error: error.message || 'Failed to create item' }, { status: 500 });
  }
}
