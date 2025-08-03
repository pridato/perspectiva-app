"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

function ResetPasswordConfirmContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()
  
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  /**
   * Maneja el establecimiento de la nueva contraseña
   * @param e - Evento del formulario
   */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validaciones
    if (!token) {
      setError("Token de recuperación no encontrado")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          token,
          password 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al restablecer la contraseña")
      }

      setIsSuccess(true)
      toast.success("Contraseña actualizada correctamente", {
        description: "Ya puedes iniciar sesión con tu nueva contraseña",
        dismissible: true,
        cancel: true,
      })
    } catch (error: any) {
      setError(error.message)
      toast.error("Error al restablecer la contraseña", {
        description: error.message,
        dismissible: true,
        cancel: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/40 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Perspectiva</h1>
            </div>
          </div>

          <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Enlace inválido</h2>
                <p className="text-slate-600">
                  El enlace de recuperación no es válido o ha expirado
                </p>
                <Link href="/auth/reset-password">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                    Solicitar nuevo enlace
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/40 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Perspectiva</h1>
            </div>
          </div>

          <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">¡Contraseña actualizada!</h2>
                <p className="text-slate-600">
                  Tu contraseña ha sido restablecida correctamente
                </p>
                <Link href="/auth/login">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                    Ir al inicio de sesión
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
          <p className="text-slate-600 text-lg">Establecer nueva contraseña</p>
          <p className="text-slate-500 text-sm mt-1">Crea una contraseña segura para tu cuenta</p>
        </div>

        {/* Card de Nueva Contraseña */}
        <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-slate-800">
              Nueva contraseña
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-slate-600 text-sm">
                Ingresa tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Nueva contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-2xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Mínimo 6 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-2xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
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
                    <span>Actualizando contraseña...</span>
                  </div>
                ) : (
                  "Actualizar contraseña"
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
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

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/40 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Perspectiva</h1>
            </div>
          </div>

          <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h2 className="text-2xl font-bold text-slate-800">Cargando...</h2>
                <p className="text-slate-600">Por favor espera un momento</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <ResetPasswordConfirmContent />
    </Suspense>
  )
} 