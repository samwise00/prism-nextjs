"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { slideIn, staggerContainer, fadeIn } from "../utils/motion";
import { socials } from "../constants";
import { useEffect, useState } from "react";

import { TypingText } from "../components";
import nftAbi from "../constants/IpfsNft.json";
import networkMapping from "../constants/networkMapping.json";

import { useWeb3Contract, useMoralis } from "react-moralis";

const Hero = () => {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "5";
  const nftAddress = networkMapping[chainString].IpfsNft[0];

  const [mintFee, setMintFee] = useState(null);

  const { runContractFunction: getMintFee } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "getMintFee",
  });

  const { runContractFunction: requestNft } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "requestNft",
    msgValue: mintFee,
  });

  useEffect(() => {
    const fetchMintFee = async () => {
      let fee = await getMintFee();
      setMintFee(fee);
    };
    fetchMintFee().catch(console.error);
  }, [isWeb3Enabled]);

  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`md:max-w-[1280px] w-full md:mx-auto mx-auto flex flex-row justify-center gap-8`}
      >
        <div className="flex flex-col z-9 max-w-[40%] md:min-w-[400px] min-w-[50px] md:mt-40 md:ml-10 mt-16 md:mr-10">
          <motion.div variants={slideIn("left", "tween", 0.9, 1.2)}>
            <TypingText
              title="&mdash; PRISM PROJECT &mdash;"
              textStyles="font-geo text-pink-500 md:text-[12px] text-xs"
              delay={1}
            />
            <div className="font-bakbak font-bold text-xs md:text-[36px] md:leading-10 text-white">
              MINTING, STAKING, TRADING, EARNING. POWERED BY $PRISM
              <span className="text-pink-500">.</span>
            </div>
            <div className="text-[8px] md:text-[10px] mt-4 text-slate-300">
              It's the year 2096 AD and the AI robot legion has begun to take
              control of various global sociopolitical and economic systems. Are
              you the baddest NFT collector around? Mint a Prism to find out.
            </div>
            <div className="md:flex md:flex-row gap-4">
              <div className="flex flex-row mt-[24px] gap-3">
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-8 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                  onClick={requestNft}
                  disabled={!isWeb3Enabled}
                >
                  <span className="font-bold text-xs text-white">MINT</span>
                </button>
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-8 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                >
                  <span className="font-bold text-xs text-white">$PRISM</span>
                </button>
              </div>
              <div className="flex flex-row my-4 gap-4 mt-4 md:mt-[28px]">
                {socials.map((social) => (
                  <img
                    key={social.name}
                    src={social.url}
                    alt={social.name}
                    className="w-[24px] h-[24px] object-contain cursor-pointer socialicon duration-200"
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn()}
            className={`${styles.heroHeading} text-white`}
          ></motion.div>
        </div>

        <motion.div
          variants={fadeIn("left", "spring", 1.5, 2)}
          className="z-10"
        >
          <div className="absolute bg-gradient-to-b from-white/0 via-black/20 to-black md:mt-[280px] w-[200px] h-[400px] md:w-[300px] md:h-[300px] z-10" />
          <img
            src="/prismherofinal.png"
            alt="cover"
            className="w-[200px] h-[300px] md:w-[300px] md:h-[500px] object-cover md:mt-[60px] mt-[30px] sm:mr-10 border-white z-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
