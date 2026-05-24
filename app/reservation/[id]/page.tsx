"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ReservationPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(900)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  async function confirmPurchase() {
    const res = await fetch(`/api/reserve/${id}/confirm`, {
      method: "POST"
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
      return
    }

    setMessage("Purchase confirmed successfully")
  }

  async function cancelReservation() {
    const res = await fetch(`/api/reserve/${id}/release`, {
      method: "POST"
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
      return
    }

    setMessage("Reservation cancelled successfully")
    router.refresh()
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-5">
        Reservation Details
      </h1>

      <div className="border p-5 rounded">
        <p>Reservation ID: {id}</p>

        <p className="mt-3">
          Time left: {minutes}:{seconds.toString().padStart(2, "0")}
        </p>

        <button
          onClick={confirmPurchase}
          className="mt-5 mr-3 rounded bg-green-600 px-4 py-2 text-white"
        >
          Confirm Purchase
        </button>

        <button
          onClick={cancelReservation}
          className="mt-5 rounded bg-red-600 px-4 py-2 text-white"
        >
          Cancel
        </button>

        {message && (
          <p className="mt-5 font-bold">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}