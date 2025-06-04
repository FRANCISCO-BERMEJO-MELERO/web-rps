import React, { use, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import ConfirmModal from './Modals/ConfirmModal';
import { Sparkles, Gamepad2, Info, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useGames } from '../../hooks/useGames';
import Modal from './Modals/Modal';
import { sha256 } from 'js-sha256';


export default function Header() {
  const { address, connectWallet, disconnectWallet } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const { createGame } = useGames();
  const [showModal, setShowModal] = useState(false);

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
      <header className="w-full fixed top-0 z-50 bg-neutral-900/70 backdrop-blur-md border-b border-neutral-700">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img
                src="/img/Roshambo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-0 rounded-full transition-opacity duration-300 group-hover:opacity-30"></div>
            </div>
            <span className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Roshambo
            </span>
          </Link>

          <ul className="flex gap-6 items-center bg-neutral-800/50 border border-neutral-700/40 rounded-full px-6 py-2 shadow-inner">
            <li>
              <Link
                to="/games"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110 active:scale-95 duration-300"
              >
                <Sparkles className="h-4 w-4" /> Juegos
              </Link>
            </li>
            <li>
              <Link
                to="/my-games"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110 active:scale-95 duration-300"
              >
                <Gamepad2 className="h-4 w-4" /> Mis Juegos
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-purple-400 transition-all flex items-center gap-1 hover:scale-110 active:scale-95 duration-300"
              >
                <Info className="h-4 w-4" /> Acerca de
              </Link>
            </li>
          </ul>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {address ? (
              <>
                <span className="bg-gradient-to-r from-green-500 to-emerald-400 text-sm px-4 py-2 rounded-full shadow-md animate-pulse">
                  {address.slice(0, 10)}...
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-sm px-4 py-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Crear juego
                </button>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-500 text-sm px-4 py-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-sm px-4 py-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <LogIn className="inline-block h-4 w-4 mr-1" /> Conectar Wallet
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Compensamos altura del header */}
      <div className="h-16" />


      {showConfirm && (
        <ConfirmModal
          title="Conectar Wallet"
          description="¿Estás seguro de que quieres conectar tu wallet?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        />
      )
      }

      <Toaster position="bottom-right" richColors />
    </>
  );
}
