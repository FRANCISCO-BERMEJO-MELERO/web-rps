import React from 'react';
import MainLayout from '../components/Layout/Layout';

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-12 text-neutral-100">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <img
            src="/img/Roshambo.png"
            alt="Roshambo Logo"
            className="rounded-full mx-auto w-24 h-24 mb-4"
          />
          <h1 className="text-4xl font-extrabold text-purple-400">Acerca de Roshambo</h1>
          <p className="mt-2 text-lg text-neutral-300">
            Una experiencia de juego dinámica, moderna y pensada para ti.
          </p>
        </div>

        {/* Sección principal */}
        <div className="bg-neutral-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm space-y-6">
          <p className="leading-relaxed text-neutral-200">
            <strong>Roshambo</strong> es una plataforma de juegos en línea donde la competencia se encuentra con la diversión. Diseñada para ser rápida, ligera y sin fricciones, puedes unirte a partidas o crear las tuyas propias con un solo clic. Olvídate de las instalaciones y las cuentas complejas — aquí, lo importante es jugar.
          </p>

          <p className="leading-relaxed text-neutral-300">
            Nuestra misión es hacer del juego una experiencia accesible y conectada. Ya sea que estés en tu portátil, tablet o incluso desde el móvil, puedes acceder a Roshambo y empezar a competir en segundos. Todo está optimizado para que tu tiempo se dedique al juego, no a esperar.
          </p>

          {/* Imágenes y descripción */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-4 justify-center md:justify-start">
              <img
                src="/img/piedra.png"
                alt="Piedra"
                className="w-20 h-20 object-contain rounded-xl border border-purple-500"
              />
              <img
                src="/img/papel.png"
                alt="Papel"
                className="w-20 h-20 object-contain rounded-xl border border-purple-500"
              />
              <img
                src="/img/tijera.png"
                alt="Tijera"
                className="w-20 h-20 object-contain rounded-xl border border-purple-500"
              />
            </div>
            <div className="flex-1 text-neutral-200">
              <h2 className="text-xl font-bold text-purple-300 mb-2">Explora. Selecciona. Juega.</h2>
              <p>
                Roshambo ofrece una selección variada de modos de juego. Desde partidas rápidas hasta desafíos más competitivos. Elige tu estilo, invita a tus amigos y empieza la partida.
              </p>
            </div>
          </div>

          <p className="leading-relaxed text-neutral-300">
            Creemos que los juegos no solo entretienen, también conectan. Por eso nos esforzamos en crear una comunidad donde todos los jugadores se sientan bienvenidos. Estamos construyendo más que una app: estamos creando un espacio donde compartir risas, estrategias y momentos únicos.
          </p>

          <p className="leading-relaxed text-neutral-200">
            Roshambo está en constante evolución. Muy pronto verás nuevos juegos, rankings en tiempo real, perfiles personalizables y más sorpresas.
          </p>

          <div className="text-center pt-6">
            <p className="text-lg font-medium text-purple-200">¡Gracias por formar parte de Roshambo!</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
