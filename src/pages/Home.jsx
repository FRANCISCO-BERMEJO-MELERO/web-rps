import MainLayout from '../components/Layout/Layout';
import GameViewer from '../components/Games/GameViewer'; // Asegúrate de tener este componente

export default function Games() {
  const byUser = false;;
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Juegos Disponibles</h1>
      <GameViewer byUser={"hola"} /> 
    </MainLayout>
  );
}
