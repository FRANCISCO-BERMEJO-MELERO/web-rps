import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import piedraImg from '/img/piedra.png';
import papelImg from '/img/papel.png';
import tijeraImg from '/img/tijera.png';
import { useState } from 'react';
import { useGames } from '../../../hooks/useGames';
import { toast } from 'sonner';

export default function PlayMoveModal({ id, onClose }) {
  const [selectedMove, setSelectedMove] = useState(null);
  const { playMove } = useGames();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMove ) {
      toast.error("Por favor, selecciona un movimiento y escribe un nonce");
      return;
    }

    try {
      await playMove(id, selectedMove);
      toast.success("Movimiento enviado correctamente");
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      onClose();
    } catch (error) {
      console.error("Error al jugar el movimiento:", error);
      toast.error("Error al jugar el movimiento");
    }
  };

  const moves = [
    { name: 'piedra', img: piedraImg },
    { name: 'papel', img: papelImg },
    { name: 'tijera', img: tijeraImg },
  ];

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-neutral-900 border border-purple-500/30 rounded-xl p-6 w-full max-w-md text-white shadow-xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-purple-400 hover:text-pink-400 text-xl font-bold"
            aria-label="Cerrar"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Jugar Movimiento</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm text-purple-300 font-semibold mb-2 block">Elige tu movimiento</label>
              <div className="flex justify-center gap-4">
                {moves.map((move) => (
                  <button
                    key={move.name}
                    type="button"
                    onClick={() => setSelectedMove(move.name)}
                    className={`p-2 border-2 rounded-md transition ${selectedMove === move.name
                        ? 'border-purple-500 bg-neutral-800'
                        : 'border-transparent hover:border-purple-400'
                      }`}
                  >
                    <img src={move.img} alt={move.name} className="w-16 h-16" />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-md transition hover:scale-105"
            >
              Confirmar Movimiento
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
