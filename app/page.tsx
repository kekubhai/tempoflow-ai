"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Clock, Brain, Zap } from 'lucide-react'
import AboutMe from './about/page'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 text-white">
      <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Boost Your Productivity with PomodoroPlus
        </motion.h1>
        
        <motion.p 
          className="text-xl text-center mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Experience a revolutionary way to manage your time and skyrocket your efficiency.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Clock className="w-12 h-12 mb-4 text-yellow-300" />
              <h2 className="text-xl font-semibold mb-2">Customizable Timers</h2>
              <p className="text-center">Set work and break intervals that suit your workflow.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Brain className="w-12 h-12 mb-4 text-green-300" />
              <h2 className="text-xl font-semibold mb-2">Improved Focus</h2>
              <p className="text-center">Enhance concentration and reduce burnout with timed work sessions.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardContent className="flex flex-col items-center p-6">
              <Zap className="w-12 h-12 mb-4 text-pink-300" />
              <h2 className="text-xl font-semibold mb-2">Boost Productivity</h2>
              <p className="text-center">Accomplish more in less time with structured work intervals.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link href="/pomodro">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
              Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
          <AboutMe/>
        </motion.div>
      </main>
    </div>
  )
}