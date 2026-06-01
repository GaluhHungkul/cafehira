import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const reservationSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email format'),
  customerPhone: z.string().min(5, 'Phone number must be at least 5 characters'),
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  reservationTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format. Use HH:mm'),
  guestCount: z.number().int().min(1, 'At least 1 guest required').max(7, 'Maximum 7 guests allowed'),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation error', details: result.error.issues },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      reservationDate,
      reservationTime,
      guestCount,
      notes,
    } = result.data;

    // Validate if the slot exists (within business hours)
    const dateObj = new Date(reservationDate);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let startHour = 7;
    let lastReservationHour = 20;

    if (isWeekend) {
      startHour = 8;
      lastReservationHour = 21;
    }

    const [hourStr, minStr] = reservationTime.split(':');
    const hour = parseInt(hourStr, 10);
    const minutes = parseInt(minStr, 10);

    if (minutes !== 0) {
      return NextResponse.json({ error: 'Reservations are only available on the hour' }, { status: 400 });
    }

    if (hour < startHour || hour > lastReservationHour) {
      return NextResponse.json({ error: 'Selected time is outside of business hours' }, { status: 400 });
    }

    // Use a transaction to ensure race conditions are prevented
    try {
      const reservation = await prisma.$transaction(async (tx) => {
        // Check availability
        const existingReservation = await tx.reservation.findFirst({
          where: {
            reservationDate,
            reservationTime,
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
        });

        if (existingReservation) {
          throw new Error('SLOT_UNAVAILABLE');
        }

        // Create reservation
        return await tx.reservation.create({
          data: {
            customerName,
            customerEmail,
            customerPhone,
            reservationDate,
            reservationTime,
            guestCount,
            notes,
            status: 'PENDING',
          },
        });
      });

      return NextResponse.json({ success: true, reservation }, { status: 201 });
    } catch (txError: any) {
      if (txError.message === 'SLOT_UNAVAILABLE') {
        return NextResponse.json({ error: 'The selected time slot is no longer available' }, { status: 409 });
      }
      throw txError;
    }
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
