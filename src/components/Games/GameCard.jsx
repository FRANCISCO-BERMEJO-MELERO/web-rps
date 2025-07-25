import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGames } from '../../hooks/useGames';
import { useAuthStore } from '../../stores/authStore';
import { User, Swords, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import GameActions from './GameActions';

export default function GameCard({game}) {
  const { address } = useAuthStore();
  const { joinGame, getActualHeight  } = useGames();
  const [showDetails, setShowDetails] = useState(false);
  const isParticipant = address === game.creator || address === game.opponent;
  const isActive = game.state === 'active';

  const formattedBetAmount = (parseFloat(game.bet.amount) / 1e6).toLocaleString('es-ES');
  const formattedBetDenom = game.bet.denom === 'stake' ? 'UMANO' : game.bet.denom;

  const [deadlineMinutes, setDeadlineMinutes] = useState({ mins: null, secs: null });

useEffect(() => {
  const calculateDeadline = async () => {
    const currentHeight = await getActualHeight();
    const totalSeconds = game.deadline - currentHeight;

    if (totalSeconds > 0) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      setDeadlineMinutes({ mins, secs });
    } else {
      setDeadlineMinutes({ mins: 0, secs: 0 });
    }
  };

  if (game.deadline) {
    calculateDeadline();
  }
}, [game]);






  const handleJoinGame = () => {
    joinGame(game.id, address);
    
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
      transition={{ duration: 1  , ease: 'easeInOut' }}
      className="relative rounded-2xl p-6 mb-8 w-full  max-w-2xl mx-auto bg-neutral-900/60 backdrop-blur-md border border-purple-600/40  text-white overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold tracking-widest flex items-center gap-2">
          <Swords className="h-5 w-5 text-purple-400" />
          Juego #{game.id}
        </h3>
        <span className={`px-4 py-1 mr-10 text-xs font-semibold rounded-full ${game.state === 'pending' ? 'bg-yellow-600/30 text-yellow-300' : game.state === 'active' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>
          {game.state.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-4">
          <p>Jugador 1</p>
          <User className="h-8 w-8 text-cyan-400" />
          <p className="text-xs">{game.creator.slice(0, 9)}...{game.creator.slice(-3)}</p>
          {game.creatorMove !== "" && (
            <img src={"/img/" + game.creatorMove + ".png"} alt={game.creatorMove} className=' rounded-full border-5 border-amber-300 w-15 h-15 ' />
          )

          }
        </div>

        <div className="flex flex-col items-center gap-2 ">
          <p className="text-sm">Apuesta</p>
          <p className="text-lg font-bold text-purple-300">{formattedBetAmount} {formattedBetDenom}</p>
          {game.state === 'pending' && !isParticipant && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinGame}
              className="mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 rounded-full text-sm font-semibold  hover:scale-105 transition-transform"
            >
              Unirse
            </motion.button>
          )}
          {game.state === 'finished' && (
            <p className="text-sm">
              <Sparkles className="inline-block w-4 h-4 text-amber-400" /> Ganador: <span className="font-bold">{game.winner === game.creator ? 'Jugador 1' : game.winner === game.opponent ? 'Jugador 2' : 'Empate'}</span>
            </p>
          )}
          <GameActions game={game} user={address} />
        </div>

        <div className="flex flex-col items-center gap-5">
          <p>Jugador 2</p>
          <User className="h-8 w-8 text-pink-400" />
          <p className="text-xs">{game.opponent ? `${game.opponent.slice(0, 9)}...${game.opponent.slice(-3)}` : 'Esperando...'}</p>
          { game.opponentMove != "" && (
            <img src={"/img/" + game.opponentMove + ".png"} alt={game.opponentMove} className=' rounded-full border-5 border-amber-300 w-15 h-15 '  />
          )

          }

        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>
          Duración: {deadlineMinutes.mins !== null 
            ? `${deadlineMinutes.mins} min ${deadlineMinutes.secs} seg` 
            : 'Cargando...'}
        </p>
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
                    <p><strong>Hash Creador:</strong> {game.creatorHash}</p>
                    <p><strong>Hash Oponente:</strong> {game.opponentHash}</p>
                    <p><strong>Movimiento Creador:</strong> {game.creatorMove || 'No revelado'}</p>
                    <p><strong>Movimiento Oponente:</strong> {game.opponentMove || 'No revelado'}</p>
                    
                </div>
                </motion.div>
            )}
        </AnimatePresence>

    </motion.div>
  );
}
