import React , {useEffect, useState}from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import {useGames} from '../../../hooks/useGames.jsx';
import { useAuthStore } from '../../../stores/authStore.js';
import { toast } from 'sonner';



export default function Modal({ onClose }) {
    const { createGame, getActualHeight  } = useGames();
    const { balance } = useAuthStore();
    const [actualheight, setActualHeight] = useState(0);

    useEffect(() => {
        getActualHeight().then(height => {
            setActualHeight(height);
        }
        ).catch(error => {
            toast.error('Error al obtener la altura actual del bloque');
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const amount = formData.get('amount');
        const denom = formData.get('denom');
        const time = formData.get('time');

        if (!amount || !denom || !time) {
            toast.error("Por favor, completa todos los campos");
            return;
        }

        if (parseFloat(amount) > balance) {
            console.log(parseFloat(amount))
            console.log(balance)
            toast.error("Saldo insuficiente para crear el juego");
            return;
        }

        try {   
            await createGame(amount, denom, time);
            toast.success("Juego creado exitosamente");
            onClose();
        } catch (error) {
            console.error("Error al crear el juego:", error);
            toast.error("Error al crear el juego");
        }
    }



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="bg-neutral-900 border border-purple-600/50 rounded-xl p-6 max-w-sm w-full text-center shadow-xl relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-purple-400 hover:text-pink-400 text-xl font-bold focus:outline-none"
                        aria-label="Cerrar"
                        type="button"
                    >
                        ×
                    </button>
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Crear Juego</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="text-sm text-purple-300 font-semibold text-left">Apuesta</label>
                        <div className="flex items-center gap-2">
                            <input
                                name="amount"
                                type="number"
                                placeholder={`Max: ${balance}`}
                                className="px-4 py-2 rounded-md w-full bg-neutral-800 border border-purple-500/30 focus:border-purple-400 focus:outline-none text-white placeholder:text-purple-300 transition"
                                required
                                max={balance}
                                min={1}
                                step="any"
                            />
                            <select
                                name="denom"
                                defaultValue="stake"
                                className="px-4 py-2 rounded-md bg-neutral-800 border border-purple-500/30 focus:border-purple-400 focus:outline-none text-white transition"
                                required
                            >
                                <option value="stake">UMANO</option>
                            </select>
                        </div>
                        <label className="text-sm text-purple-300 font-semibold text-left">Duración de la partida (minutos)</label>
                        <input
                            type="number"
                            name="time"
                            placeholder="Ej: 30"
                            className="px-4 py-2 rounded-md bg-neutral-800 border border-purple-500/30 focus:border-purple-400 focus:outline-none text-white placeholder:text-purple-300 transition"
                            required
                            min={1}
                        />
                        <button
                            type="submit"
                            className="mt-2 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-lg transition"
                        >
                            Crear Juego
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
