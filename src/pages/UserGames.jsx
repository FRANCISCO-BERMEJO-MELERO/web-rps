import MainLayout from '../components/Layout/Layout';
import React from 'react';
import GameViewer from '../components/Games/GameViewer';

export default function UserGames() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 ">
        <h1 className="text-3xl font-bold text-center  mb-4 text-purple-400">
          Tus Partidas
        </h1>
        <span className="text-center text-gray-500 mb-8 mx justify-center flex">
          Aquí puedes ver todas las partidas que has creado o en las que has participado.
        </span>

        <GameViewer byUser={true} />
      </div>
    </MainLayout>
  );
}
