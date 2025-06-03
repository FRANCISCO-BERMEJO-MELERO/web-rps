import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import ConfirmModal from './ConfirmModal';
import { Sparkles, Gamepad2, Info, LogIn } from 'lucide-react';

export default function Header() {
  const { address, connectWallet } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      toast.promise(
        connectWallet(),
        {
          loading: "Conectando la wallet...",
          success: "Wallet conectada correctamente",
          error: "Error al conectar la wallet",
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 z-50 bg-neutral-900/70 backdrop-blur-md ">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="https://pingpub.dezen.dev/" className="flex items-center gap-2 group">
            <div className="relative">
              <img
                src="/img/Roshambo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-30"></div>
            </div>
            <span className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Roshambo
            </span>
          </a>

          {/* Links */}
          <ul className="flex gap-6 bg-neutral-800/50 border border-neutral-700/40 rounded-full px-8 py-2 shadow-inner">
            <li>
              <a
                href="#"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110  active:scale-95  duration-300"
              >
                <Sparkles className="h-4 w-4" /> Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110  active:scale-95  duration-300"
              >
                <Gamepad2 className="h-4 w-4" /> Juegos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110  active:scale-95  duration-300"
              >
                <Info className="h-4 w-4" /> Acerca de
              </a>
            </li>
          </ul>

          {/* Botón de conexión */}
          <div>
            {address ? (
              <span className="relative inline-block bg-gradient-to-r from-green-500 to-emerald-400 text-sm px-4 py-1 rounded-full shadow-md animate-pulse hover:scale-105 transition-transform duration-300">
                {address.slice(0, 10)}...
                <span className="absolute inset-0 rounded-full blur-xl opacity-30 bg-green-500 animate-pulse pointer-events-none"></span>
              </span>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="relative bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-sm px-4 py-2 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
              >
                <LogIn className="inline-block h-4 w-4 mr-1" /> Conectar Wallet
                <span className="absolute inset-0 rounded-full blur-xl opacity-30 bg-purple-500 animate-pulse pointer-events-none"></span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mantenemos un pequeño padding-top en el contenido para que no quede cubierto por el header */}
      <div className="pt-[68px]" />

      {/* Modal de confirmación (debe estar fuera del header) */}
      {showConfirm && (
        <ConfirmModal
          title="Conectar Wallet"
          description="¿Estás seguro de que quieres conectar tu wallet?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Toast notifications */}
      <Toaster position="bottom-right" richColors />
    </>
  );
}
