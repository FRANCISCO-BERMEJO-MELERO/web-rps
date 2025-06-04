// useGames.js
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'sonner';
import { connectWallet } from '../utils/blockchain';
import { sha256 } from 'js-sha256';
const RPC = "http://localhost:26657";


export const useGames = () => {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { address, balance } = useAuthStore();

  const getActualHeight = async () => {
    try {
      const response = await fetch(`${RPC}/status`);
      if (!response.ok) throw new Error(`Error fetching status: ${response.status} ${response.statusText}`);
      const data = await response.json();
      if (!data.result || !data.result.sync_info) {
        throw new Error('Malformed response: missing result.sync_info');
      }
      const latestHeight = Number(data.result.sync_info.latest_block_height);
      return latestHeight;
    } catch (error) {
      console.error('Error fetching actual height:', error);
      return null;
    }

  }

  const hashOptionNonce = (option, nonce) => {
    var hash = sha256.create();
    hash.update(option + nonce);
    const result = hash.hex();
    console.log("Hash generado:", hash.hex());
    return result;
  }

  const getSecretWord = () => {
    return address.slice(-9)
  }



  const getAllGames = async () => {
    try {
      const response = await fetch('http://localhost:1317/red/rps/games/');
      if (!response.ok) throw new Error('Error fetching games');

      const data = await response.json();
      setGames(prevGames => {
        if (JSON.stringify(prevGames) !== JSON.stringify(data.games)) {
          return data.games;
        }
        return prevGames;
      });
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error("Error al cargar los juegos");
    }
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
  const createGame = async (betAmount, betDenom, deadline) => {
    if (deadline < getActualHeight() || betAmount < balance) {
      toast.error("Apuesta inválida o saldo insuficiente");
      return;
    }

    if (!address) {
      toast.error("Por favor, conecta tu wallet primero");
      return;
    }
    try {
      const { client, address } = await connectWallet();
      const msg = {
        typeUrl: "/red.rps.MsgCreateGame",
        value: {
          creator: address,
          bet: {
            amount: betAmount.toString(),
            denom: betDenom,
          },
          deadline: deadline,
        },
      }
      const fee = {
        amount: [{ denom: "stake", amount: "500" }],
        gas: "200000",
      };
      const result = await client.signAndBroadcast(address, [msg], fee);
      console.log("✅ Resultado:", result);
    } catch (error) {
      console.error("Error al crear el juego:", error);
      toast.error("Error al crear el juego");
    }

  }

  const playMove = async (gameId, move) => {
    if (!address) {
      toast.error("Por favor, conecta tu wallet primero");
      return;
    }

    try {
      const nonce = getSecretWord()
      const { client, address } = await connectWallet();
      const msg = {
        typeUrl: "/red.rps.MsgPlayMove",
        value: {
          creator: address,
          player: address,
          gameId: gameId,
          moveHash: hashOptionNonce(move, nonce),
        },
      };

      const fee = {
        amount: [{ denom: "stake", amount: "500" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, [msg], fee);
      console.log("✅ Resultado:", result);
      toast.success("Movimiento jugado correctamente!");
    } catch (error) {
      console.error("Error al jugar el movimiento:", error);
      toast.error("Error al jugar el movimiento");
    }
  };


  const revealMove = async ( id, move) => {
    if (!address){
      toast.error("Por favor, conecta tu wallet primero")
      return;
    }
    try{
      const nonce = getSecretWord()
      const { client, address } = await connectWallet()
      const msg = {
        typeUrl: "/red.rps.MsgRevealMove",
        value: {
          creator: address,
          player: address,
          gameId: id,
          move: move,
          nonce: nonce
        }
      }
      const fee = {
        amount: [{ denom: "stake", amount: "500" }],
        gas: "200000",
      };
      const result = await client.signAndBroadcast(address, [msg], fee)
      console.log("✅ Resultado:", result);
      toast.success("Movimiento revelado correctamente!");

    }catch(error){
      console.log("Reveal move error: ", error)
      toast.error("Error al revelar el movimiento")
    }
  }

  return { games, loading, getAllGames, joinGame, getActualHeight, createGame, playMove, revealMove };

};
