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

  const nftAddress = networkMapping["5"].IpfsNft[0];

  const [mintFee, setMintFee] = useState(null);
  const [chainString, setChainString] = useState(parseInt(chainId).toString());

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
    setChainString(parseInt(chainId).toString());
  }, [isWeb3Enabled, chainId]);

  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`md:max-w-[1280px] w-full md:mx-auto mx-auto flex flex-row justify-center gap-8 z-6`}
      >
        <div
          id="hero"
          className="flex flex-col z-9 max-w-[40%] md:min-w-[400px] min-w-[50px] md:mt-40 md:ml-10 pt-4 md:mr-10"
        >
          <motion.div variants={slideIn("left", "tween", 0.9, 1.2)}>
            <TypingText
              title="&mdash; PRISM PROJECT &mdash;"
              textStyles="font-geo text-pink-500 md:text-[12px] text-[8px]"
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
            <div className="md:flex md:flex-row gap-6 z-10">
              <div className="flex flex-row pt-4 gap-3">
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-8 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                  onClick={requestNft}
                  disabled={!isWeb3Enabled || chainString != "5"}
                >
                  <span className="font-bold text-md text-white">MINT</span>
                </button>
              </div>
              <div className="flex flex-row py-4 md:py-6 gap-4">
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

        <motion.div variants={fadeIn("left", "spring", 1.5, 2)} className="z-3">
          <img
            src="/prismherofinal.png"
            alt="cover"
            className="w-[150px] h-[250px] md:w-[300px] md:h-[500px] object-cover md:mt-[60px] mt-[10px] border-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
