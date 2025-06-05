import { useGames } from '../../hooks/useGames';
import React, { useState, useEffect } from 'react';
import PlayMoveModal from '../Layout/Modals/PlayMoveModal';
import RevealMoveModal from '../Layout/Modals/RevealModal';
import { Hand } from 'lucide-react';
import { toast } from 'sonner';

export default function GameActions({ game, user }) {
  const { getActualHeight, claimTimeOut } = useGames();
  const [height, setHeight] = useState(null);

  const [showPlayMoveModal, setShowPlayMoveModal] = useState(false);
  const [showRevealMoveModal, setShowRevealMoveModal] = useState(false);

  useEffect(() => {
    const fetchHeight = async () => {
      const h = await getActualHeight();
      setHeight(h);
    };
    fetchHeight();
  }, [getActualHeight]);
  const isTimeOut = game.deadline < height ;
  const isCreator = game.creator === user;
  const isOpponent = game.opponent === user;
  const isParticipant = isCreator || isOpponent;
  const bothPlayed = game.creatorHash && game.opponentHash;

  const canPlayMove =
    (isCreator && !game.creatorHash) || (isOpponent && !game.opponentHash);

  const canRevealMove =
    bothPlayed &&
    ((isCreator && !game.creatorMove) || (isOpponent && !game.opponentMove));

  let canClaim =
    height !== null &&
    bothPlayed &&
    ((isCreator && game.creatorMove) || (isOpponent && game.opponentMove)) &&
    game.state == "timeout";

  if (!isParticipant) return null;

  const handleClaimTimeOut = async () => {
    await claimTimeOut(game.id)
    toast.success("Reclamado correctamente")
  }

  return (
    <div className="flex gap-2 z-50">
      <div className="flex flex-wrap gap-4 z-50 mt-4">
        {canPlayMove && !isTimeOut && (
          <button
            onClick={() => setShowPlayMoveModal(true)}
            className="relative px-5 py-2 rounded-lg border-2  bg-neutral-900 text-white font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95
        border-purple-500 hover:text-purple-300 before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-purple-600 before:opacity-30 before:blur-md before:animate-pulse"
          >
            Jugar movimiento
          </button>
        )}

        {canRevealMove && !isTimeOut && (
          <button
            onClick={() => setShowRevealMoveModal(true)}
            className="relative px-5 py-2 rounded-lg border-2 border-yellow-500 text-yellow-300 font-semibold bg-transparent transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:text-yellow-400"
          >
            Revelar movimiento
          </button>
        )}

        {canClaim && (
          <button
            onClick={handleClaimTimeOut}
            className="relative px-5 py-2 rounded-lg border-2 border-emerald-500 text-emerald-300 font-semibold bg-transparent transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:text-emerald-400"
          >
            Reclamar premio
          </button>
        )}
      </div>

      {showPlayMoveModal && (
        <PlayMoveModal id={game.id} onClose={() => setShowPlayMoveModal(false)} />
      )}
      {showRevealMoveModal && (
        <RevealMoveModal id={game.id} onClose={() => setShowRevealMoveModal(false)} />
      )}
    </div>
  );
}
