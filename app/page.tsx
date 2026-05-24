export const dynamic = "force-dynamic"

import ReserveButton from "../components/ReserveButton"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      inventories: {
        include: {
          warehouse: true
        }
      }
    }
  })

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-5">
        Products
      </h1>

      {products.map((product: any) => (
        <div
          key={product.id}
          className="border p-5 mb-5 rounded"
        >
          <h2 className="text-xl font-bold">
            {product.name}
          </h2>

          {product.inventories.map((inv: any) => (
            <div key={inv.id} className="mt-3">
              <p>Warehouse: {inv.warehouse.name}</p>
              <p>Total Stock: {inv.totalStock}</p>
              <p>Reserved: {inv.reservedStock}</p>
              <p>Available: {inv.totalStock - inv.reservedStock}</p>

              <ReserveButton
                productId={product.id}
                warehouseId={inv.warehouseId}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}