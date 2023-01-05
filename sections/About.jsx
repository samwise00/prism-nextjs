"use client";

import { motion } from "framer-motion";
import { slideIn, staggerContainer, fadeIn } from "../utils/motion";

import { TypingText } from "../components";

import styles from "../styles";

const Stats = () => (
  <section
    className={`${styles.yPaddings} mx-auto max-w-screen w-full bg-[rgb(31,32,32)] `}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col justify-center items-center mx-auto md:max-w-[750px]"
    >
      <TypingText
        title="&mdash; WHO WE ARE &mdash;"
        textStyles="text-white font-geo text-pink-500 md:text-[12px] mb-2 text-xs"
        delay={0.3}
      />

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 2)}
        className="flex flex-col justify-center items-center gap-y-4 z-10"
      >
        <div className="font-bakbak font-bold md:text-[36px] text-3xl md:leading-10 text-white">
          What is $PRISM?
        </div>
        <p className="text-slate-300 text-center mx-10 text-[8px] md:text-[10px]">
          $PRISM is a decentralized protocol providing marketplace NFT trading
          and NFT staking in order to earn yield in the form of $PRISM tokens.
        </p>
        <p className="text-slate-300 text-center mx-10 text-[8px] md:text-[10px]">
          This is also purely a portfolio project. Prism utilizes four smart
          contracts (marketplace, erc20token, staking, erc721 NFT collection) as
          well as a Next.js + TailwindCSS front end, and indexing for the
          marketplace using TheGraph in order to achieve this presentation. All
          contracts are deployed on Goerli testnet.
        </p>
      </motion.div>
    </motion.div>
  </section>
);

export default Stats;
