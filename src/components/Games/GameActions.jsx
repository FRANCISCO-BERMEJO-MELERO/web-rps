export default function GameActions({ game, user }) {
  const isCreator = game.creator === user;
  const isOpponent = game.opponent === user;
  const isParticipant = isCreator || isOpponent;
  const hasPlayed = (isCreator && game.creator_hash) || (isOpponent && game.opponent_hash);
  const hasRevealed = (isCreator && game.creator_move) || (isOpponent && game.opponent_move);
  const isWinner = game.winner === user;
  const gameFinished = game.state === 'finished';

  if (!isParticipant) return null;

  return (
    <div className="flex gap-2">
      {!hasPlayed && <button >Jugar movimiento</button>}
      {hasPlayed && !hasRevealed && <button >Revelar movimiento</button>}
      {isWinner && gameFinished && <button >Reclamar premio</button>}
    </div>
  );
}
