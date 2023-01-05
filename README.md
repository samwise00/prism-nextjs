## Prism NFTs / Trading / Staking

Hey there! Prism is one of my portfolio projects I've created on my web3 development journey. In this Dapp, users can mint NFTs, buy/sell those NFTs on the Prism trading page, and stake the NFTs in order to earn yield in the form of $PRISM tokens.

There are four smart contracts associate with this projects: The staking contract, the ERC20 rewards token contract, the erc721 NFT collection, and the marketplace contract. The frontend interacts with all of these contracts and displays the appropriate behavior to the user

This Dapp built using:
Next.js 13 || TailwindCSS || Framer Motion || Ethers.js

Contracts With:
Solidity || Hardhat

Run locally:

```bash
npm install
# then
npm run dev
# or
yarn dev
```

You'll need to generate an [alchemy key](https://dashboard.alchemy.com/) and set it as an environment variable.

Functioning on Goerli Testnet.

Open [http://localhost:3000](http://localhost:3000) in your browser and happy minting/trading/trading!
