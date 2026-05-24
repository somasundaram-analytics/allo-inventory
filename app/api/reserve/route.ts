import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { productId, warehouseId, quantity } = body

    const reservation = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        SELECT * FROM "Inventory"
        WHERE "productId" = ${productId}
        AND "warehouseId" = ${warehouseId}
        FOR UPDATE
      `

      const inventory = await tx.inventory.findFirst({
        where: {
          productId,
          warehouseId
        }
      })

      if (!inventory) {
        throw new Error("INVENTORY_NOT_FOUND")
      }

      const available =
        inventory.totalStock - inventory.reservedStock

      if (available < quantity) {
        throw new Error("OUT_OF_STOCK")
      }

      await tx.inventory.update({
        where: {
          id: inventory.id
        },
        data: {
          reservedStock: {
            increment: quantity
          }
        }
      })

      return tx.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        }
      })
    })

    return NextResponse.json(reservation)

  } catch (error: any) {
    if (error.message === "OUT_OF_STOCK") {
      return NextResponse.json(
        { error: "Not enough stock" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}