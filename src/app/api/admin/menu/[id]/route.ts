import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params

  try {
    const session = await auth();
    if (!session || (session.user).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(menuItem);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || (session.user).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await prisma.menuItem.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
