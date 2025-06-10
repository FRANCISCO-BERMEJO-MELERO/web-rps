import React from 'react'
import IntroLayout from '../components/Layout/IntroLayout.jsx'
import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <IntroLayout>
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text animate-fade-in-down">
          Bienvenido a Roshambo
        </h1>

        <p className="text-lg text-neutral-400 mb-8 max-w-xl">
          Duelos eternos. Jugadas cifradas. Todo queda en la cadena.
        </p>

        <Link to="/games">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full transition-all text-white cursor-pointer">
            Comenzar
          </button>
        </Link>
      </div>
    </IntroLayout>
  )
}
