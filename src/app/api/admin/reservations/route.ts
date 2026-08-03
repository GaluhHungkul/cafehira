import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // const { searchParams } = new URL(request.url);
    // const status = searchParams.get('status');

    // const reservations = await prisma.reservation.findMany({
    //   where: { status: status} ,
    //   orderBy: [
    //     { reservationDate: 'desc' },
    //     { reservationTime: 'desc' }
    //   ],
    // });

    return NextResponse.json({gituwe: true});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
