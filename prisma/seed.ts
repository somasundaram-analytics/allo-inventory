import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  const product = await prisma.product.create({
    data: {
      name: "iPhone 15"
    }
  })

  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse"
    }
  })

  await prisma.inventory.create({
    data: {
      productId: product.id,
      warehouseId: warehouse.id,
      totalStock: 10
    }
  })

  console.log("Seed data inserted")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })