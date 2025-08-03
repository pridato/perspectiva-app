"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token de verificación no encontrado")
      return
    }

    // Llamar al backend para verificar el token
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        if (response.ok) {
          setStatus("success")
          setMessage("¡Email verificado exitosamente!")
        } else {
          setStatus("error")
          setMessage("Token inválido o expirado")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Error al verificar el email")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-2xl">
        <CardContent className="p-8 text-center">
          {status === "loading" && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">Verificando email...</h2>
              <p className="text-slate-600">Por favor espera un momento</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">¡Email verificado!</h2>
              <p className="text-slate-600">{message}</p>
              <Link href="/auth/login">
                <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                  Ir al login
                </Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-red-600 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">Error de verificación</h2>
              <p className="text-slate-600">{message}</p>
              <Link href="/login">
                <Button variant="outline" className="rounded-xl">
                  Volver al login
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}