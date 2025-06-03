import { useEffect } from 'react';
import GameCard from './GameCard';
import { useGames } from '../../hooks/useGames';

const GameViewer = () => {
  const { games, getAllGames, loading } = useGames();

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {loading ? (
        <div className="text-purple-400 animate-pulse text-center mt-20">
          <p className="text-lg font-semibold">Cargando juegos...</p>
        </div>
      ) : games && games.length > 0 ? (
        <div className="flex flex-col gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              creator={game.creator}
              opponent={game.opponent}
              bet_denom={game.bet.denom}
              bet_amount={game.bet.amount}
              state={game.state}
              created_at={game.createdAt}
              creator_hash={game.creatorHash}
              opponent_hash={game.opponentHash}
              creator_move={game.creatorMove}
              opponent_move={game.opponentMove}
              winner={game.winner}
              deadline={game.deadline}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No hay partidas disponibles por ahora. ¡Crea la tuya!</p>
        </div>
      )}
    </div>
  );
};

export default GameViewer;
