import { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { useGames } from '../../hooks/useGames';

const GAMES_PER_PAGE = 5;

const GameViewer = () => {
  const { games, getAllGames, loading } = useGames();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllGames(); // Llamada inicial

    const interval = setInterval(() => {
      getAllGames();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil((games?.length || 0) / GAMES_PER_PAGE);
  const paginatedGames = games?.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 z-10">
      {loading ? (
        <div className="text-purple-400 animate-pulse text-center mt-20">
          <p className="text-lg font-semibold">Cargando juegos...</p>
        </div>
      ) : games && games.length > 0 ? (
        <>
          <div className="flex flex-col gap-6">
            {paginatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="flex justify-center items-center mt-6 gap-4 ">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 disabled:opacity-20 hover:border-neutral-300 rounded-md border-transparent border transition-all duration-300"
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2  disabled:opacity-50 hover:border-neutral-300 rounded-md border-transparent border transition-all duration-300"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No hay partidas disponibles por ahora. ¡Crea la tuya!</p>
        </div>
      )}
    </div>
  );
};

export default GameViewer;
