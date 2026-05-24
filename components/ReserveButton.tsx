"use client"

export default function ReserveButton({
  productId,
  warehouseId
}: {
  productId: string
  warehouseId: string
}) {

  async function reserve() {

    const res = await fetch("/api/reserve", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        productId,
        warehouseId,
        quantity: 1
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Reservation created")

    window.location.reload()
  }

  return (
    <button
      onClick={reserve}
      className="mt-3 rounded bg-white px-4 py-2 text-black"
    >
      Reserve
    </button>
  )
}