import { SigningStargateClient } from "@cosmjs/stargate";
import { customRegistry } from "./registry";
import { toast } from "sonner";

// Asegúrate de sugerir la red antes de habilitarla
export const connectWallet = async () => {
  if (!window.keplr) {
    toast.error("Por favor instala Keplr");
    throw new Error("Keplr no está instalado");
  }

  try {
    await suggestChainToKeplr(); // Sugerir red primero
    await window.keplr.enable("red"); // Ahora Keplr ya la reconoce

    const offlineSigner = window.getOfflineSigner("red");
    const accounts = await offlineSigner.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(
      "http://localhost:26657",
      offlineSigner,
      { registry: customRegistry }
    );

    return { client, address: accounts[0].address };
  } catch (err) {
    console.error("Error al conectar la wallet:", err);
    toast.error("No se pudo conectar la wallet");
    throw err;
  }
};


export const suggestChainToKeplr = async () => {
  if (!window.keplr) throw new Error("Por favor instala Keplr");

  await window.keplr.experimentalSuggestChain({
    chainId: "red",
    chainName: "Red",
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: "cosmos",
      bech32PrefixAccPub: "cosmospub",
      bech32PrefixValAddr: "cosmosvaloper",
      bech32PrefixValPub: "cosmosvaloperpub",
      bech32PrefixConsAddr: "cosmosvalcons",
      bech32PrefixConsPub: "cosmosvalconspub",
    },
    currencies: [{ coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 }],
    feeCurrencies: [{ coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 }],
    stakeCurrency: { coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 },
  });
};
