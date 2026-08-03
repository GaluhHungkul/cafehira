import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [totalReservations, pendingReservations, confirmedReservations, totalMenuItems, recentReservations] = await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: 'PENDING' } }),
      prisma.reservation.count({ where: { status: 'CONFIRMED' } }),
      prisma.menuItem.count(),
      prisma.reservation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      })
    ]);

    return NextResponse.json({
      totalReservations,
      pendingReservations,
      confirmedReservations,
      totalMenuItems,
      recentReservations,
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
