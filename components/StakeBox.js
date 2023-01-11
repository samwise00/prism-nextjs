"use client";

import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import prismStakingAbi from "../constants/PrismStaking.json";
import nftAbi from "../constants/IpfsNft.json";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

export default function StakeBox({ nftAddress, tokenId, prismStakingAddress }) {
  const { isWeb3Enabled, account } = useMoralis();
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [earningInfo, setEarningInfo] = useState(null);
  const dispatch = useNotification();
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  const { runContractFunction: getEarningInfo } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "earningInfo",
    params: {
      account: account,
      tokenIds: [tokenId],
    },
  });

  const { runContractFunction: unstake } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "unstake",
    params: {
      tokenIds: [tokenId],
    },
  });

  const { runContractFunction: claim } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "claim",
    params: {
      tokenIds: [tokenId],
    },
  });

  const handleUnstakeButtonClick = () => {
    unstake({
      onError: (error) => console.log(error),
      onSuccess: () => handleUnstakeSuccess(),
    });
  };

  const handleClaimButtonClick = async () => {
    const info = await getEarningInfo();
    claim({
      onError: (error) => console.log(error),
      onSuccess: () => handleClaimSuccess(),
    });
  };

  const handleUnstakeSuccess = () => {
    dispatch({
      type: "success",
      message: "Item unstaked!",
      title: "Item Unstaked",
      position: "topR",
    });
  };

  const handleClaimSuccess = () => {
    dispatch({
      type: "success",
      message: "Tokens Claimed!",
      title: "Tokens Claimed",
      position: "topR",
    });
  };

  async function updateUI() {
    const tokenURI = await getTokenURI();
    // We are going to cheat a little here...
    if (tokenURI) {
      // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setTokenName(tokenURIResponse.name);
      // We could render the Image on our sever, and just call our sever.
      // For testnets & mainnet -> use moralis server hooks
      // Have the world adopt IPFS
      // Build our own IPFS gateway
      const info = await getEarningInfo();
      setEarningInfo(ethers.utils.formatEther(info.toString()));
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      <div>
        {imageURI ? (
          <div>
            <div className="rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px]">
              <div className="flex flex-col rounded-lg bg-[rgb(31,32,32)] mx-auto">
                <div className="p-4 gap-2">
                  <div className="flex flex-row gap-4">
                    <img
                      src={imageURI}
                      alt="nftBox"
                      className="flex md:h-[200px] md:w-[200px] h-[150px] w-[150px] justify-start items-center mx-auto"
                    />
                    <div className="flex flex-col justify-between ">
                      <div className="flex flex-col md:items-center items-start">
                        <h3 className="md:text-2xl text-md font-bold text-slate-300">
                          Prism #{tokenId}
                        </h3>
                        {tokenName == "uncommon" ? (
                          <h3 className="md:text-[10px] text-[8px] font-bold text-blue-300 pb-1">
                            {tokenName}
                          </h3>
                        ) : tokenName == "rare" ? (
                          <h3 className="md:text-[10px] text-[8px] font-bold text-purple-500 pb-1">
                            {tokenName}
                          </h3>
                        ) : tokenName == "common" ? (
                          <h3 className="md:text-[10px] text-[8px] font-bold text-gray-500 pb-1">
                            {tokenName}
                          </h3>
                        ) : tokenName == "legendary" ? (
                          <h3 className="md:text-[10px] text-[8px] text-orange-500 pb-1">
                            {tokenName}
                          </h3>
                        ) : (
                          <p></p>
                        )}
                        <h3 className="flex justify-center text-md font-bold text-slate-300 pt-4">
                          $PRISM Earned
                        </h3>
                        <h3 className="flex justify-center md:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                          {earningInfo && formatter.format(earningInfo)}
                        </h3>
                      </div>

                      <div className="flex flex-row gap-4 pb-1 md:visible invisible">
                        <button
                          type="button"
                          className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                          disabled={!isWeb3Enabled}
                          onClick={handleUnstakeButtonClick}
                        >
                          <span className="font-bold text-xs text-white">
                            Unstake
                          </span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                          disabled={!isWeb3Enabled}
                          onClick={handleClaimButtonClick}
                        >
                          <span className="font-bold text-xs text-white">
                            Claim
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center gap-4 py-4 pb-1 md:hidden">
                    <button
                      type="button"
                      className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                      disabled={!isWeb3Enabled}
                      onClick={handleUnstakeButtonClick}
                    >
                      <span className="font-bold text-xs text-white">
                        Unstake
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                      disabled={!isWeb3Enabled}
                      onClick={handleClaimButtonClick}
                    >
                      <span className="font-bold text-xs text-white">
                        Claim
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
