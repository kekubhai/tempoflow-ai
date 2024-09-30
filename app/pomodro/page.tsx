/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import * as THREE from 'three'

interface TimerDisplayProps {
  time: number;
  isDarkMode: boolean;
}

function TimerDisplay({ time, isDarkMode }: TimerDisplayProps) {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current
      const positions = particles.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10
        positions[i + 1] = (Math.random() - 0.5) * 10
        positions[i + 2] = (Math.random() - 0.5) * 10
      }
      particles.geometry.attributes.position.needsUpdate = true
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
    }
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 5
    state.camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 5
    state.camera.lookAt(0, 0, 0)
  })

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color={isDarkMode ? "#6366f1" : "#4f46e5"} />
      </mesh>
      <mesh>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color={isDarkMode ? "#818cf8" : "#6366f1"} wireframe />
      </mesh>
      <Text
        position={[0, 0, 0.5]}
        fontSize={0.5}
        color={isDarkMode ? "#ffffff" : "#1f2937"}
        anchorX="center"
        anchorY="middle"
        maxWidth={viewport.width}
      >
        {formatTime(time)}
      </Text>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={isDarkMode ? "#818cf8" : "#6366f1"} size={0.05} sizeAttenuation />
      </points>
    </group>
  )
}

export default function Component() {
  const [workTime, setWorkTime] = useState({ hours: 0, minutes: 25, seconds: 0 })
  const [breakTime, setBreakTime] = useState({ hours: 0, minutes: 5, seconds: 0 })
  const [time, setTime] = useState(workTime.hours * 3600 + workTime.minutes * 60 + workTime.seconds)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsWork((prevIsWork) => !prevIsWork)
      setTime(isWork ? 
        breakTime.hours * 3600 + breakTime.minutes * 60 + breakTime.seconds :
        workTime.hours * 3600 + workTime.minutes * 60 + workTime.seconds
      )
      setIsActive(false)
    } else {
      if (interval) {
        clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, time, isWork, workTime, breakTime])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsWork(true)
    setTime(workTime.hours * 3600 + workTime.minutes * 60 + workTime.seconds)
  }

  const handleTimeChange = (type: 'work' | 'break', field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const newValue = Math.max(0, Math.min(parseInt(value) || 0, field === 'hours' ? 23 : 59))
    if (type === 'work') {
      setWorkTime(prev => ({ ...prev, [field]: newValue }))
      if (isWork) {
        setTime(
          (field === 'hours' ? newValue : workTime.hours) * 3600 +
          (field === 'minutes' ? newValue : workTime.minutes) * 60 +
          (field === 'seconds' ? newValue : workTime.seconds)
        )
      }
    } else {
      setBreakTime(prev => ({ ...prev, [field]: newValue }))
      if (!isWork) {
        setTime(
          (field === 'hours' ? newValue : breakTime.hours) * 3600 +
          (field === 'minutes' ? newValue : breakTime.minutes) * 60 +
          (field === 'seconds' ? newValue : breakTime.seconds)
        )
      }
    }
  }

  const progress = isWork
    ? 1 - time / (workTime.hours * 3600 + workTime.minutes * 60 + workTime.seconds)
    : 1 - time / (breakTime.hours * 3600 + breakTime.minutes * 60 + breakTime.seconds)

  return (
    <div className={`flex flex-col items-center justify-between min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full h-[60vh]">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <TimerDisplay time={time} isDarkMode={isDarkMode} />
        </Canvas>
      </div>
      <div className={`w-full max-w-md p-6 rounded-t-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">
            {isWork ? 'Work Time' : 'Break Time'}
          </h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="theme-mode">Dark Mode</Label>
            <Switch
              id="theme-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Work Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={workTime.hours}
                onChange={(e) => handleTimeChange('work', 'hours', e.target.value)}
                min="0"
                max="23"
                placeholder="HH"
              />
              <Input
                type="number"
                value={workTime.minutes}
                onChange={(e) => handleTimeChange('work', 'minutes', e.target.value)}
                min="0"
                max="59"
                placeholder="MM"
              />
              <Input
                type="number"
                value={workTime.seconds}
                onChange={(e) => handleTimeChange('work', 'seconds', e.target.value)}
                min="0"
                max="59"
                placeholder="SS"
              />
            </div>
          </div>
          <div>
            <Label>Break Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={breakTime.hours}
                onChange={(e) => handleTimeChange('break', 'hours', e.target.value)}
                min="0"
                max="23"
                placeholder="HH"
              />
              <Input
                type="number"
                value={breakTime.minutes}
                onChange={(e) => handleTimeChange('break', 'minutes', e.target.value)}
                min="0"
                max="59"
                placeholder="MM"
              />
              <Input
                type="number"
                value={breakTime.seconds}
                onChange={(e) => handleTimeChange('break', 'seconds', e.target.value)}
                min="0"
                max="59"
                placeholder="SS"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={toggleTimer} className="flex-1 mx-1">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} className="flex-1 mx-1" variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
