import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const reservation = await prisma.reservation.findUnique({
    where: { id }
  })

  if (!reservation) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    )
  }

  if (reservation.status !== "PENDING") {
    return NextResponse.json(reservation)
  }

  if (reservation.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Reservation expired" },
      { status: 410 }
    )
  }

  const confirmed = await prisma.reservation.update({
    where: { id },
    data: { status: "CONFIRMED" }
  })

  return NextResponse.json(confirmed)
}