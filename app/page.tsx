import ReserveButton from "../components/ReserveButton"

async function getProducts() {

  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store"
    }
  )

  return res.json()
}

export default async function Home() {

  const products = await getProducts()

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

            <div
              key={inv.id}
              className="mt-3"
            >

              <p>
                Warehouse:
                {" "}
                {inv.warehouse.name}
              </p>

              <p>
                Total Stock:
                {" "}
                {inv.totalStock}
              </p>

              <p>
                Reserved:
                {" "}
                {inv.reservedStock}
              </p>

              <p>
                Available:
                {" "}
                {inv.totalStock - inv.reservedStock}
              </p>

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