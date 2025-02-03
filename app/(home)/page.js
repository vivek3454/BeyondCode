"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const technologies = ["React", "Next.js", "JavaScript", "CSS", "HTML", "Node.js", "Git", "TypeScript"]

export default function Home() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prevIndex) => (prevIndex + 1) % technologies.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <main className="max-w-4xl mx-auto">
        <nav className="flex justify-end mb-8">
          <Link href="/test">
            <Button variant="ghost" className="text-white hover:text-black">
              Test
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="ghost" className="text-white hover:text-black">
              Login
            </Button>
          </Link>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm Vivek Parde
            </motion.h1>
            <motion.p
              className="text-xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A passionate web developer documenting my learning journey
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900">
                <GitHub className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900">
                <Mail className="mr-2 h-4 w-4" /> Contact
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="md:w-1/3 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <svg viewBox="0 0 200 200" className="w-full max-w-md mx-auto">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#gradient)" />
              <text x="100" y="100" textAnchor="middle" dy=".3em" fill="white" fontSize="20" fontWeight="bold">
                {technologies[currentTechIndex]}
              </text>
            </svg>
          </motion.div>
        </div>

        <motion.section
          className="bg-gray-800 rounded-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">About This Site</h2>
          <p>
            Welcome to my personal learning hub! This website serves as a digital garden where I document my journey in
            web development. Here, you'll find my notes, tutorials, and insights on various technologies and best
            practices. Feel free to explore and learn along with me!
          </p>
        </motion.section>
      </main>
    </div>
  )
}

