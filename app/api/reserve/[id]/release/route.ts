import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const result = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id }
    })

    if (!reservation) {
      return null
    }

    if (reservation.status !== "PENDING") {
      return reservation
    }

    await tx.inventory.update({
      where: {
        productId_warehouseId: {
          productId: reservation.productId,
          warehouseId: reservation.warehouseId
        }
      },
      data: {
        reservedStock: {
          decrement: reservation.quantity
        }
      }
    })

    const released = await tx.reservation.update({
      where: { id },
      data: { status: "RELEASED" }
    })

    return released
  })

  if (!result) {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(result)
}