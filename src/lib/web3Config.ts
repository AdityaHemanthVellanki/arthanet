import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'ArthaNet',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Infura API key for ethers provider
export const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || 'YOUR_INFURA_API_KEY';

// OpenAI API key
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
