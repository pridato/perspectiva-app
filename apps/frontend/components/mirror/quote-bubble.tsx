"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface QuoteBubbleProps {
  quote: string
  context: string
  date: string
  emotion?: string
}

export function QuoteBubble({ quote, context, date, emotion }: QuoteBubbleProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Quote className="w-4 h-4 text-white" />
            </div>
            <blockquote className="text-slate-700 italic text-lg leading-relaxed flex-1">"{quote}"</blockquote>
          </div>

          <div className="pl-11 space-y-2">
            <p className="text-sm text-slate-600 font-medium">{context}</p>
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span>{date}</span>
              {emotion && (
                <>
                  <span>•</span>
                  <span className="capitalize">{emotion}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
