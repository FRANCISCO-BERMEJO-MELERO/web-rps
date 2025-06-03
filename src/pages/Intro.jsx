import React from 'react'
import IntroLayout from '../components/Layout/IntroLayout.jsx'
import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <IntroLayout>
        <div className="flex flex-col items-center justify-center min-h-screen  text-white">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a GameHub</h1>
            <p className="text-lg text-gray-400 mb-8">Tu plataforma para juegos en línea</p>
            <Link to="/games">
            <button  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full transition-all text-white cursor-pointer" >
            Comenzar
            </button>
            </Link>
        </div>
    </IntroLayout>
  )
}   
