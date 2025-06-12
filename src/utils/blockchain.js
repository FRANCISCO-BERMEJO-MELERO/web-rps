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
    await window.keplr.enable("roshambo"); // Ahora Keplr ya la reconoce

    const offlineSigner = window.getOfflineSigner("roshambo");
    const accounts = await offlineSigner.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(
      "https://roshambo.dezen.dev/rpc/",
      offlineSigner,
      { registry: customRegistry }
    );
    console.log("Cliente",client)

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
    chainId: "roshambo",
    chainName: "Roshambo",
    rpc: "https://roshambo.dezen.dev/rpc/",
    rest: "https://roshambo.dezen.dev/api",
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: "rosh",
      bech32PrefixAccPub: "roshpub",
      bech32PrefixValAddr: "roshvaloper",
      bech32PrefixValPub: "roshvaloperpub",
      bech32PrefixConsAddr: "roshvalcons",
      bech32PrefixConsPub: "roshvalconspub",
    },
    currencies: [{ coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 }],
    feeCurrencies: [{ coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 }],
    stakeCurrency: { coinDenom: "STAKE", coinMinimalDenom: "stake", coinDecimals: 6 },
  });
};
