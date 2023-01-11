"use client";

import { Network, Alchemy } from "alchemy-sdk";
import { useChain, useMoralis } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import { Loading } from "web3uikit";
import NFTBox from "../components/NFTBox";
import { useEffect, useState } from "react";
import styles from "../styles";

export default function Trade() {
  const { switchNetwork } = useChain();
  const { account, isWeb3Enabled, chainId } = useMoralis();

  const marketplaceAddress = networkMapping["5"].NftMarketplace[0];
  const prismNftAddress = networkMapping["5"].IpfsNft[0];

  const [chainString, setChainString] = useState(parseInt(chainId).toString());
  const [myNfts, setMyNfts] = useState(null);

  const alchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(alchemySettings);

  useEffect(() => {
    if (isWeb3Enabled) {
      const nftsForOwner = async () => {
        let myNfts = await alchemy.nft.getNftsForOwner(account, {
          contractAddresses: [prismNftAddress],
        });
        setMyNfts(myNfts);
      };
      nftsForOwner().catch(console.error);
      setChainString(parseInt(chainId).toString());
    }
  }, [isWeb3Enabled, chainId]);

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  const checkIfListed = (myNft) => {
    let isListed;

    listedNfts.activeItems.map((item) => {
      if (item.tokenId == myNft.tokenId) {
        isListed = true;
      }
    });

    return isListed;
  };

  return (
    <div className={`${styles.xPaddings} py-8 relative`}>
      {!isWeb3Enabled ? (
        <p className="flex justify-center text-white pt-8 h-screen">
          Please connect to Web3.
        </p>
      ) : chainString != "5" && isWeb3Enabled ? (
        <div className="flex flex-col items-center h-screen">
          <p className="pt-20 text-2xl text-white">Unsupported Chain.</p>
          <p className="text-white">
            Please connect to &nbsp;
            <span>
              <button
                onClick={() => switchNetwork("0x5")}
                className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 font-bold"
              >
                <p>Goerli Testnet</p>
              </button>
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h1 className="flex md:justify-start justify-center py-4 px-4 font-bold text-2xl text-white">
            Prism NFTs For Sale
          </h1>
          <div className="flex flex-wrap md:justify-start justify-center">
            {isWeb3Enabled ? (
              loading || !listedNfts ? (
                <div
                  style={{
                    backgroundColor: "#ECECFE",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <Loading
                    size={12}
                    spinnerColor="#2E7DAF"
                    spinnerType="wave"
                  />
                </div>
              ) : (
                listedNfts.activeItems.map((nft) => {
                  const { price, nftAddress, tokenId, seller } = nft;
                  return (
                    <div className="p-2" key={`${nft.tokenId}${account}`}>
                      <NFTBox
                        price={price}
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        marketplaceAddress={marketplaceAddress}
                        seller={seller}
                        isListed={true}
                        isActive={true}
                      />
                    </div>
                  );
                })
              )
            ) : (
              <div className="text-white md:p-4">
                Web3 Currently Not Enabled
              </div>
            )}
          </div>
          {isWeb3Enabled ? (
            <div>
              <h1 className="flex md:justify-start justify-center py-4 pt-20 px-4 font-bold text-2xl text-white">
                My Prisms
              </h1>
              <div className="flex flex-wrap md:justify-start justify-center">
                {myNfts &&
                  !loading &&
                  myNfts.ownedNfts.map((nft) => {
                    let isListed = checkIfListed(nft);
                    return (
                      <div
                        className="p-2"
                        key={`${nft.contract.address}${nft.tokenId}`}
                      >
                        <NFTBox
                          nftAddress={nft.contract.address}
                          tokenId={nft.tokenId}
                          marketplaceAddress={marketplaceAddress}
                          isListed={isListed}
                          isActive={false}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <p>hi</p>
          )}
        </div>
      )}
    </div>
  );
}
