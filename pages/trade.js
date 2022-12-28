"use client";

import { Network, Alchemy } from "alchemy-sdk";
import { useMoralisQuery, useMoralis } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import { Loading } from "web3uikit";
import NFTBox from "../components/NFTBox";
import { useEffect, useState } from "react";

export default function Trade() {
  const { account, isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "5";
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];
  const prismNftAddress = networkMapping[chainString].IpfsNft[0];
  const [myNfts, setMyNfts] = useState(null);

  const alchemySettings = {
    apiKey: "ASzOoMdVeykRAVDqjJGP3DeQGoMVvHnX",
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(alchemySettings);
  console.log(`connected wallet: ${account}`);

  useEffect(() => {
    const nftsForOwner = async () => {
      let myNfts = await alchemy.nft.getNftsForOwner(
        "0x97A08B37AbD78275fD84A803fBfAF87fBe6c64AF",
        {
          contractAddresses: [prismNftAddress],
        }
      );
      setMyNfts(myNfts);
    };
    nftsForOwner().catch(console.error);
  }, [isWeb3Enabled]);

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  return (
    <div className="mx-auto bg-black w-full">
      <h1 className="py-4 px-4 font-bold text-2xl text-white">
        Recently Listed
      </h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div
              style={{
                backgroundColor: "#ECECFE",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <Loading size={12} spinnerColor="#2E7DAF" spinnerType="wave" />
            </div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft;
              return (
                <div className="p-2">
                  <NFTBox
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                  />
                </div>
              );
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
      <h1 className="py-4 px-4 font-bold text-2xl text-white">My Prisms</h1>
      <div className="flex flex-wrap">
        {myNfts &&
          myNfts.ownedNfts.map((nft) => {
            console.log(nft);
            return (
              <div className="p-2">
                <NFTBox
                  nftAddress={nft.contract.address}
                  tokenId={nft.tokenId}
                  marketplaceAddress={marketplaceAddress}
                  key={`${nft.contract.address}${nft.tokenId}`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
