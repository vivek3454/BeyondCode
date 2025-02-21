"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ChevronLeft, ChevronRight, GitlabIcon as GitHub, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

const technologies = ["React", "Next.js", "JavaScript", "CSS", "HTML", "Node.js", "Git", "TypeScript", "Tailwind Css", "Mongodb", "Express.js", "Shadcn UI"]

export default function Home() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0)
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("isDarkModeOn"));
    if (storedTheme) {
      setIsDarkModeOn(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkModeOn', isDarkModeOn);
    document.documentElement.classList.toggle('dark', isDarkModeOn);
  }, [isDarkModeOn]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prevIndex) => (prevIndex + 1) % technologies.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 text-black dark:from-gray-900 dark:to-gray-950 dark:text-white p-8">
      <main className="container mx-auto">
        <nav className="flex justify-between gap-3 mb-8">
          <Link href="/" className='text-2xl text-black dark:text-white font-semibold flex gap-[2px] items-center'>
            <div className='flex text-black dark:text-white gap-0 items-center'>
              <ChevronLeft className='-mr-2' />
              <ChevronRight />
            </div>
            BeyondCode
          </Link>
          <div className="flex gap-3 items-center">
            <Link href="/test">
              <Button variant="ghost" className="dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white">
                Test
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost" className="dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white">
                Login
              </Button>
            </Link>
            <button className='dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white rounded-full w-10 h-10 flex text-xl justify-center items-center' onClick={() => setIsDarkModeOn((prev) => !prev)}>
              {isDarkModeOn ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
          </div>
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
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                <GitHub className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button variant="outline" className="text-white bg-black border-white hover:bg-white hover:text-gray-900 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                <Twitter className="mr-2 h-4 w-4" /> Twitter
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
          className="dark:bg-gray-800 bg-gray-300 rounded-lg p-8 mb-16"
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

