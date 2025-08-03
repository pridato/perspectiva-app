"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  /**
   * Maneja el envío del email de recuperación
   * @param e - Evento del formulario
   */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al enviar el email de recuperación")
      }

      setIsEmailSent(true)
      toast.success("Email enviado correctamente", {
        description: "Revisa tu bandeja de entrada para continuar con la recuperación",
        dismissible: true,
        cancel: true,
      })
    } catch (error: any) {
      setError(error.message)
      toast.error("Error al enviar el email", {
        description: error.message,
        dismissible: true,
        cancel: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el reenvío del email
   */
  const handleResendEmail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al reenviar el email")
      }

      toast.success("Email reenviado correctamente", {
        description: "Revisa tu bandeja de entrada nuevamente",
        dismissible: true,
        cancel: true,
      })
    } catch (error: any) {
      toast.error("Error al reenviar el email", {
        description: error.message,
        dismissible: true,
        cancel: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Perspectiva</h1>
          </div>
          <p className="text-slate-600 text-lg">Recuperar contraseña</p>
          <p className="text-slate-500 text-sm mt-1">Te ayudaremos a recuperar tu cuenta</p>
        </div>

        {/* Card de Recuperación */}
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-slate-800">
              {isEmailSent ? "Email enviado" : "Recuperar contraseña"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isEmailSent ? (
              <>
                <div className="text-center mb-6">
                  <p className="text-slate-600 text-sm">
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 rounded-2xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="hover:cursor-pointer w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando email...</span>
                      </div>
                    ) : (
                      "Enviar email de recuperación"
                    )}
                  </Button>
                </form>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    ¡Email enviado!
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full h-12 border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 rounded-2xl font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Reenviando...</span>
                      </div>
                    ) : (
                      "Reenviar email"
                    )}
                  </Button>

                  <Button
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                      setError("")
                    }}
                    variant="ghost"
                    className="w-full h-12 text-slate-600 hover:text-slate-800 rounded-2xl font-medium"
                  >
                    Usar otro email
                  </Button>
                </div>
              </>
            )}

            <div className="text-center pt-4">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/register" className="text-purple-600 hover:text-purple-700 font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
