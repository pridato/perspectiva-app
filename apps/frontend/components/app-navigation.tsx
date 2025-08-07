"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Brain, Home, History, User, Menu, X, TrendingUp, Eye, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

export function AppNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const navigation = [
    { name: "Inicio", href: "/app", icon: Home },
    { name: "Historial", href: "/app/historial", icon: History },
    { name: "Patrones", href: "/app/patrones", icon: TrendingUp },
    { name: "Espejo", href: "/app/espejo", icon: Eye },
    { name: "Perfil", href: "/app/perfil", icon: User },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/app" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Perspectiva</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-purple-100 text-purple-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
            
            {/* User info and logout */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-200">
              <span className="text-sm text-slate-600">Hola, {user?.name || user?.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start space-x-2 px-4 py-3 rounded-xl",
                        isActive
                          ? "bg-purple-100 text-purple-700"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-100",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
              
              {/* Mobile user info and logout */}
              <div className="pt-4 border-t border-slate-200 mt-4">
                <div className="px-4 py-2 text-sm text-slate-600">
                  Hola, {user?.name || user?.email}
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start space-x-2 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}