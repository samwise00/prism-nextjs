"use client";

import { motion } from "framer-motion";
import { fade, fadeIn, staggerContainer } from "../utils/motion";

import { TypingText } from "../components";

import styles from "../styles";

const Stats = () => (
  <section className="py-12 px-3 mt-8 mx-auto w-full bg-[rgb(31,32,32)]">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col justify-center items-center md:mx-auto md:max-w-[750px]"
    >
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 2)}
        className="flex flex-col justify-center items-center gap-y-4"
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <TypingText
            title="&mdash; THE PRISM COLLECTION &mdash;"
            textStyles="font-geo text-pink-500 md:text-[12px] text-xs"
            delay={0.75}
          />
          <div className="font-bakbak font-bold md:text-[36px] text-3xl md:leading-10 text-white">
            RARE NFTS
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <motion.div
            variants={fadeIn("up", "spring", 0.5, 1.2)}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className="md:h-[250px] w-full rounded-xs bg-yellow-500/30 p-[2px] md:max-w-[160px] max-w-[130px] h-[210px]">
              <div className="h-full w-full rounded-lg bg-black mx-auto">
                <img
                  src="/prismcard3.png"
                  alt="cover"
                  className="h-[210px] w-[110px] md:w-[180px] md:h-[250px] object-cover sm:mr-10 p-1 pb-2 rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "spring", 0.85, 1.2)}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className="md:h-[250px] w-full rounded-xs bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] md:max-w-[160px] max-w-[130px] h-[210px]">
              <div className="h-full w-full rounded-lg bg-black mx-auto">
                <img
                  src="/prismcard4-2.png"
                  alt="cover"
                  className="h-[210px] w-[110px] md:w-[180px] md:h-[250px] object-cover sm:mr-10 p-1 pb-2 rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "spring", 0.7, 1.2)}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className="md:h-[250px] w-full rounded-xs bg-blue-500/40 p-[2px] md:max-w-[160px] max-w-[130px] h-[210px]">
              <div className="h-full w-full rounded-lg bg-black mx-auto">
                <img
                  src="/prismcard1.png"
                  alt="cover"
                  className="h-[210px] w-[110px] md:w-[180px] md:h-[250px] object-cover sm:mr-10 p-1 pb-2 rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-slate-300 text-center mx-10 text-[8px] md:text-[10px]">
          The Prism NFT collection utilizes Chainlink Oracles to deliver
          randomness at the time of mint. NFTs vary in rarity ranging from
          common (70%) to Legendary (1%). Best of luck and happy minting!
        </p>
        <p className="text-slate-300 text-center mx-10 text-[8px] md:text-[10px]">
          The NFTs and metadata are hosted on IPFS.
        </p>
        <motion.div
          variants={fade(1.5, 2.5)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <button
            type="button"
            className="flex items-center h-fit py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
          >
            <span className="font-bold text-xs text-white">MINT</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

export default Stats;
