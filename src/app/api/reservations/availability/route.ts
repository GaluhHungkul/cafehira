// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { z } from 'zod';

// const querySchema = z.object({
//   date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
// });

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const dateParam = searchParams.get('date');

//     const result = querySchema.safeParse({ date: dateParam });
    
//     if (!result.success) {
//       return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
//     }

//     const { date } = result.data;
    
//     // Parse the date to determine the day of the week
//     const dateObj = new Date(date);
//     const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 1 is Monday...
//     const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

//     let startHour = 7;
//     let lastReservationHour = 20;

//     if (isWeekend) {
//       startHour = 8;
//       lastReservationHour = 21;
//     }

//     // Generate all possible slots for the day
//     const allSlots: string[] = [];
//     for (let hour = startHour; hour <= lastReservationHour; hour++) {
//       const formattedHour = hour.toString().padStart(2, '0');
//       allSlots.push(`${formattedHour}:00`);
//     }

//     // Fetch existing active reservations for the given date
//     const existingReservations = await prisma.reservation.findMany({
//       where: {
//         reservationDate: date,
//         status: {
//           in: ['PENDING', 'CONFIRMED'],
//         },
//       },
//       select: {
//         reservationTime: true,
//       },
//     });

//     const reservedTimes = new Set(existingReservations.map((r: { reservationTime: string }) => r.reservationTime));

//     // Map all slots to availability
//     const slots = allSlots.map(time => ({
//       time,
//       available: !reservedTimes.has(time),
//     }));

//     return NextResponse.json({
//       date,
//       slots,
//     });
//   } catch (error) {
//     console.error('Error fetching availability:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
