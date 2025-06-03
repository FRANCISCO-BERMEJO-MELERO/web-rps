import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
}
