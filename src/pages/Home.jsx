import MainLayout from '../components/Layout/Layout';
import GameList from '../components/Games/GamesList'; // Asegúrate de tener este componente

export default function Games() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Juegos Disponibles</h1>
      <GameList /> {/* Aquí muestras las partidas */}
    </MainLayout>
  );
}
