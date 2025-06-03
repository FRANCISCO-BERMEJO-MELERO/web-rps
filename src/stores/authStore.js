// useAuthStore.js
import { create } from 'zustand';
import { connectWallet } from '../utils/blockchain';
import { StargateClient } from "@cosmjs/stargate";
const RPC = "http://localhost:26657";

async function getBalance(address) {
  const client = await StargateClient.connect(RPC);
  const balance = await client.getAllBalances(address);
  const stakeBalance = balance.find(b => b.denom === 'stake');
  return stakeBalance ? parseFloat(stakeBalance.amount) / 1000000 : 0;
}

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  address: null,
  balance: 0,
  wins: 0,
  losses: 0,
  client: null,

  login: (address) => set({ isAuthenticated: true, address }),
  logout: () => set({ isAuthenticated: false, address: null, balance: 0, wins: 0, losses: 0, client: null }),

  connectWallet: async () => {
    try {
      const { client, address } = await connectWallet();
      set({ isAuthenticated: true, address, client });
      const balance = await getBalance(address);
      set({ balance });
      console.log("Conectado a la wallet:", address, "Balance:", balance);
      return { client, address, balance };
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  },
}));

export { useAuthStore };
