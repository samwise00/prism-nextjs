"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";

import { TypingText } from "../components";
import prismStakingAbi from "../constants/PrismStaking.json";
import nftAbi from "../constants/IpfsNft.json";
import { useEffect, useState } from "react";

import networkMapping from "../constants/networkMapping.json";

import styles from "../styles";
import { ethers } from "ethers";

import { useChain, useMoralis, useWeb3Contract } from "react-moralis";

const Stats = () => {
  const { switchNetwork } = useChain();
  const { isWeb3Enabled, chainId } = useMoralis();
  const prismStakingAddress = networkMapping["5"].PrismStaking[0];
  const prismNftAddress = networkMapping["5"].IpfsNft[0];
  const [totalStaked, setTotalStaked] = useState(null);
  const [rewardsDistributed, setRewardsDistributed] = useState(null);
  const [tokenCounter, setTokenCounter] = useState(null);
  const [chainString, setChainString] = useState(parseInt(chainId).toString());
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  const { runContractFunction: getTokenCounter } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: prismNftAddress,
    functionName: "getTokenCounter",
    params: {},
  });

  const { runContractFunction: getTotalStaked } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "getTotalStaked",
    params: {},
  });

  const { runContractFunction: getRewardsDistributed } = useWeb3Contract({
    abi: prismStakingAbi,
    contractAddress: prismStakingAddress,
    functionName: "getRewardsDistributed",
    params: {},
  });

  const fetchTokenCounter = async () => {
    setTokenCounter(await getTokenCounter());
  };

  const fetchRewardsDistributed = async () => {
    setRewardsDistributed(await getRewardsDistributed());
  };

  const fetchTotalStaked = async () => {
    setTotalStaked(await getTotalStaked());
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchTokenCounter();
      fetchTotalStaked();
      fetchRewardsDistributed();
      setChainString(parseInt(chainId).toString());
    }
  }, [isWeb3Enabled, chainId]);

  return (
    <section className={`${styles.yPaddings} mx-auto md:max-w-[900px] w-full`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col justify-center items-center mx-auto"
      >
        <TypingText
          title="&mdash; LIVE STATS &mdash;"
          textStyles="font-geo text-pink-500 md:text-[12px] text-xs pb-2"
          delay={1}
        />
        {!isWeb3Enabled && (
          <TypingText
            title="Enable Web3 to view live stats."
            textStyles="font-geo text-white md:text-[12px] text-xs"
            delay={2}
          />
        )}

        <motion.div variants={fadeIn("up", "spring", 1.5, 2)}>
          {isWeb3Enabled && chainString != "5" && (
            <p className="text-white">
              Please connect to &nbsp;
              <span>
                <button
                  onClick={() => switchNetwork("0x5")}
                  className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 font-bold pb-2"
                >
                  <p>Goerli Testnet</p>
                </button>
              </span>
            </p>
          )}
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 1.5, 2)}
          className="flex flex-row justify-center items-center px-4 gap-4 gap-y-2 md:gap-x-4 md:min-w-[700px] w-full"
        >
          <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
            <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
              <p className="text-[8px] text-slate-300">NFTs Minted</p>
              {tokenCounter ? (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  {tokenCounter.toString()}
                </h3>
              ) : (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  ---
                </h3>
              )}
            </div>
          </div>
          <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
            <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
              <p className="text-[8px] text-slate-300">$PRISM CLAIMED</p>
              {rewardsDistributed ? (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  {formatter.format(
                    ethers.utils.formatEther(rewardsDistributed.toString())
                  )}
                </h3>
              ) : (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  ---
                </h3>
              )}
            </div>
          </div>
          <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
            <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
              <p className="text-[8px] text-slate-300">NFTs Staked</p>
              {totalStaked ? (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  {totalStaked.toString()}
                </h3>
              ) : (
                <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                  ---
                </h3>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;
