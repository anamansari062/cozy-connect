import AppProvider from "@/../context/AppContext";
import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import NextProgress from "next-progress";


const fireChain = {
  id: 997,
  name: "5ireChain",
  network: "5ireChain",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet 5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: "https://chain-node.5ire.network",
  },
  testnet: true,
};
const { chains, provider, webSocketProvider } = configureChains(
  [fireChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== fireChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);


const Navbar = dynamic(() => import("@/../components/Navbar"), {
  ssr: false,
});

let client;
if (typeof window !== "undefined") {
  client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
}



function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div suppressHydrationWarning className=" bg-pease w-full flex flex-col h-screen overflow-hidden h-screen place-items-center bg-peace">
      <NextProgress/>
      {typeof window !== "undefined" && client && (
        <WagmiConfig client={client}>
          <div>
            <Navbar suppressHydrationWarning setIsAuthenticated={setIsAuthenticated} />
            <Component {...pageProps} isAuthenticated={isAuthenticated} />
          </div>
        </WagmiConfig>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
