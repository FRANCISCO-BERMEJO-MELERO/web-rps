import React from 'react'


export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-700 text-neutral-400 text-sm">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="tracking-wide">Built on-chain • Red Network</p>
        <p className="opacity-50">© {new Date().getFullYear()} Roshambo </p>
      </div>
    </footer>
  );
}

