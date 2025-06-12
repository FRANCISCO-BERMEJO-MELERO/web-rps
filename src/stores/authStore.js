import { create } from 'zustand';
import { connectWallet } from '../utils/blockchain';
import { StargateClient } from "@cosmjs/stargate";
const RPC = "https://roshambo.dezen.dev/rpc/";

// Cargar estado inicial desde localStorage
const savedAuth = JSON.parse(localStorage.getItem('auth')) || {};

async function getBalance(address) {
  const client = await StargateClient.connect(RPC);
  const balance = await client.getAllBalances(address);
  const stakeBalance = balance.find(b => b.denom === 'umano');
  return stakeBalance ? parseFloat(stakeBalance.amount) / 1000000 : 0;
}

const useAuthStore = create((set, get) => ({
  isAuthenticated: savedAuth.isAuthenticated || false,
  address: savedAuth.address || null,
  balance: savedAuth.balance || 0,
  client: null,

  login: (address) => {
    set({ isAuthenticated: true, address });
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, address, balance: get().balance }));
  },
  logout: () => {
    set({ isAuthenticated: false, address: null, balance: 0, wins: 0, losses: 0, client: null });
    localStorage.removeItem('auth');
  },
  connectWallet: async () => {
    try {
      const { client, address } = await connectWallet();
      const balance = await getBalance(address); // <-- calcula primero
      set({ isAuthenticated: true, address, client, balance }); // <-- luego actualiza el estado
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, address, balance })); // <-- guarda todo
      console.log("Conectado a la wallet:", address, "Balance:", balance);
      return { client, address, balance };
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  },


  disconnectWallet: () => {
    set({ isAuthenticated: false, address: null, balance: 0, wins: 0, losses: 0, client: null });
    localStorage.removeItem('auth');
    console.log("Wallet desconectada");
  }
}));

export { useAuthStore };
