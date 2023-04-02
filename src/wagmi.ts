import { getDefaultClient } from 'connectkit'
import { goerli } from "wagmi/chains";
import { createClient } from 'wagmi'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const chains = [ goerli ];

console.log("INFURA ID =>", infuraId);

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'BUTCHER APP',
    infuraId,
    chains
  })
)
