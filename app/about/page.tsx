/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin } from 'lucide-react'

export default function AboutMe() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-6"
          variants={itemVariants}
        >
          About Me
        </motion.h1>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          <motion.p className="text-gray-700" variants={itemVariants}>
            I'm Anirban Ghosh, a second-year student at TMSL (Techno Main Salt Lake) with a passion for web3 and full stack development. My journey in the world of technology has been driven by curiosity and a desire to create innovative solutions.
          </motion.p>
          <motion.p className="text-gray-700" variants={itemVariants}>
            As an aspiring full stack developer, I'm constantly honing my skills in both front-end and back-end technologies. I enjoy working with modern JavaScript frameworks and libraries to build responsive and interactive user interfaces. On the server-side, I'm exploring various backend technologies and databases to create robust and scalable applications.
          </motion.p>
          <motion.p className="text-gray-700" variants={itemVariants}>
            My fascination with web3 technologies stems from their potential to revolutionize the internet as we know it. I'm particularly interested in blockchain technology, decentralized applications (dApps), and smart contracts. I believe these technologies have the power to create more transparent, secure, and user-centric digital experiences.
          </motion.p>
          <motion.p className="text-gray-700" variants={itemVariants}>
            When I'm not coding, you can find me participating in hackathons, contributing to open-source projects, or exploring the latest trends in the tech world. I'm always eager to collaborate on exciting projects and learn from fellow developers in the community.
          </motion.p>
        </motion.div>
        <motion.div 
          className="mt-8 flex justify-center"
          variants={itemVariants}
        >
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPopupOpen(true)}
          >
            Connect with me
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl text-black font-bold mb-2">Connect with Anirban</h2>
              <div className="flex space-x-4">
                <a href="https://github.com/kekubhai" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  <Github size={32} />
                </a>
                <a href="https://www.linkedin.com/in/anirban-ghosh010/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  <Linkedin size={32} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
