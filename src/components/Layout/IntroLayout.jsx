import React from 'react'
import Footer from './Footer.jsx'

export default function IntroLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col   text-white">
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
        </div>
    )
}
