"use client";

import { Network, Alchemy } from "alchemy-sdk";
import { useMoralis, useWeb3Contract, useChain } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import prismStakingAbi from "../constants/PrismStaking.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import { Loading } from "web3uikit";
import NFTBox from "../components/NFTBox";
import StakeBox from "../components/StakeBox";
import { useEffect, useState } from "react";
import styles from "../styles";

export default function Trade() {
  const { switchNetwork } = useChain();
  const { account, isWeb3Enabled, chainId } = useMoralis();

  const prismStakingAddress = networkMapping["5"].PrismStaking[0];
  const marketplaceAddress = networkMapping["5"].NftMarketplace[0];
  const prismNftAddress = networkMapping["5"].IpfsNft[0];

  const [chainString, setChainString] = useState(parseInt(chainId).toString());
  const [myNfts, setMyNfts] = useState(null);
  const [myStakedNfts, setMyStakedNfts] = useState(null);

  const alchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(alchemySettings);

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

  const { runContractFunction: getTokensBalance } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "tokensOfOwner",
    params: {
      account: account,
    },
  });

  const updateStakedNfts = async () => {
    setMyStakedNfts(await getTokensBalance());
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      const nftsForOwner = async () => {
        console.log(`alchemy key: ${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`);
        let myNfts = await alchemy.nft.getNftsForOwner(account, {
          contractAddresses: [prismNftAddress],
        });

        console.log(`myNfts: ${myNfts}`);
        setMyNfts(myNfts);
      };
      nftsForOwner().catch(console.error);
    }
    updateStakedNfts();
    setChainString(parseInt(chainId).toString());
  }, [isWeb3Enabled, chainId]);

  return (
    <div className={`${styles.xPaddings} py-8 relative`}>
      {chainString != "5" && isWeb3Enabled ? (
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
            My Staked Prisms
          </h1>
          <div className="flex flex-wrap">
            {chainString == "5" && isWeb3Enabled ? (
              !myStakedNfts || loading || !listedNfts ? (
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
                myStakedNfts.map((nft) => {
                  return (
                    <div className="p-2" key={`${account}${nft.toString()}`}>
                      <StakeBox
                        nftAddress={prismNftAddress}
                        tokenId={nft.toString()}
                        prismStakingAddress={prismStakingAddress}
                      ></StakeBox>
                    </div>
                  );
                })
              )
            ) : (
              <div>Web3 Currently Not Enabled</div>
            )}
          </div>
          <h1 className="flex md:justify-start justify-center py-4 pt-20 px-4 font-bold text-2xl text-white">
            My Prisms
          </h1>
          <div className="flex flex-wrap md:justify-start justify-center ">
            {chainString == "5" &&
              myNfts &&
              isWeb3Enabled &&
              !loading &&
              myNfts.ownedNfts.map((nft) => {
                let isListed = checkIfListed(nft);

                return (
                  <div
                    className="p-2"
                    key={`${isListed}${nft.contract.address}${nft.tokenId}`}
                  >
                    <NFTBox
                      nftAddress={nft.contract.address}
                      tokenId={nft.tokenId}
                      marketplaceAddress={marketplaceAddress}
                      prismStakingAddress={prismStakingAddress}
                      isListed={isListed}
                      isActive={false}
                      toStake={true}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
