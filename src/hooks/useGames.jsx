// useGames.js
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'sonner';
import { connectWallet } from '../utils/blockchain';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { address } = useAuthStore();

  const getAllGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1317/red/rps/games/');
      if (!response.ok) throw new Error('Error fetching games');
      const data = await response.json();
      setGames(data.games);
      console.log("🔥 Juegos obtenidos:", data.games);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error("Error al cargar los juegos");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Helper: Uint8Array a base64
  const uint8ArrayToBase64 = (arr) => {
    let binary = '';
    arr.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  };

 const joinGame = async (gameId, opponent) => {
  if (!address) {
      toast.error("Por favor, conecta tu wallet primero");
      return;
    }

    try {
      const { client, address } = await connectWallet();

      const msg = {
        typeUrl: "/red.rps.MsgJoinGame",
        value: {
          creator: address,
          opponent,
          gameId: Number(gameId),
        },
      };

      const fee = {
        amount: [{ denom: "stake", amount: "500" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, [msg], fee);
      console.log("✅ Resultado:", result);
      toast.success("Te has unido a la partida!");
    } catch (error) {
      console.error("Error al unirse al juego:", error);
      toast.error("Error al unirse al juego");
    }
  };
  return { games, loading, getAllGames, joinGame };
};
