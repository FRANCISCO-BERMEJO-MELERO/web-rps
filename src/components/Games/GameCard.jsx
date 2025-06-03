import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGames } from '../../hooks/useGames';
import { useAuthStore } from '../../stores/authStore';
import { User, Swords, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function GameCard({
  id, creator, opponent, bet_denom, bet_amount, state, created_at,
  creator_hash, opponent_hash, creator_move, opponent_move, winner, deadline
}) {
  const { address } = useAuthStore();
  const { joinGame } = useGames();
  const [showDetails, setShowDetails] = useState(false);

  const formattedBetAmount = (parseFloat(bet_amount) / 1e6).toLocaleString('es-ES');
  const formattedBetDenom = bet_denom === 'stake' ? 'UMANO' : bet_denom.toUpperCase();
  const formattedCreatedAt = new Date(created_at * 1000).toLocaleString();

  const handleJoinGame = () => {
    joinGame(id, address);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl p-6 mb-8 w-full max-w-2xl mx-auto bg-neutral-900/60 backdrop-blur-md border border-purple-600/40 shadow-[0_0_30px_rgba(139,92,246,0.1)] text-white overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold tracking-widest flex items-center gap-2">
          <Swords className="h-5 w-5 text-purple-400" />
          Juego #{id}
        </h3>
        <span className={`px-4 py-1 mr-10 text-xs font-semibold rounded-full ${state === 'pending' ? 'bg-yellow-600/30 text-yellow-300' : state === 'active' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>
          {state.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-1">
          <User className="h-8 w-8 text-cyan-400" />
          <p className="text-xs">{creator.slice(0, 8)}...</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">Apuesta</p>
          <p className="text-lg font-bold text-purple-300">{formattedBetAmount} {formattedBetDenom}</p>
          {state === 'pending' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinGame}
              className="mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition-transform"
            >
              Unirse
            </motion.button>
          )}
          {state === 'finished' && (
            <p className="text-sm">
              <Sparkles className="inline-block w-4 h-4 text-amber-400" /> Ganador: <span className="font-bold">{winner === creator ? 'Jugador 1' : winner === opponent ? 'Jugador 2' : 'Ninguno'}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <User className="h-8 w-8 text-pink-400" />
          <p className="text-xs">{opponent ? opponent.slice(0, 8) + '...' : 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>Creado en: {formattedCreatedAt}</p>
        <p>Bloque límite: {deadline}</p>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 transition-colors"
      >
        {showDetails ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
      </button>

      <AnimatePresence>
            {showDetails && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5  }}
                className="mt-4 bg-neutral-800/70 rounded-xl  text-sm text-gray-300"
                >
                <div className="p-6">
                    <p><strong>Hash Creador:</strong> {creator_hash}</p>
                    <p><strong>Hash Oponente:</strong> {opponent_hash || 'N/A'}</p>
                    <p><strong>Movimiento Creador:</strong> {creator_move || 'No revelado'}</p>
                    <p><strong>Movimiento Oponente:</strong> {opponent_move || 'No revelado'}</p>
                    
                </div>
                </motion.div>
            )}
        </AnimatePresence>

    </motion.div>
  );
}
