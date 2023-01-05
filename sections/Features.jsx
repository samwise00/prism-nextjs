"use client";

import { motion } from "framer-motion";
import { fade, fadeIn, staggerContainer } from "../utils/motion";
import Link from "next/link";

import { TypingText } from "../components";

import styles from "../styles";

const Features = () => (
  <section className={`${styles.yPaddings} px-8`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col justify-center mx-auto items-center md:mx-auto md:max-w-[350px]"
    >
      <div className="flex flex-col justify-center items-center mx-auto mb-20">
        <TypingText
          title="&mdash; HOW IT WORKS &mdash;"
          textStyles="font-geo text-pink-500 md:text-[12px] text-xs"
          delay={0}
        />
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 2)}
          className="font-bakbak font-bold md:text-[36px] text-3xl md:leading-10 text-white"
        >
          INTERACT
        </motion.div>
      </div>

      <div className="flex flex-col justify-center mx-auto items-center md:mx-auto gap-y-10">
        <motion.div
          variants={fadeIn("right", "spring", 0.8, 2)}
          className="flex flex-row justify-center mx-auto items-end md:mx-auto"
        >
          <h3 className="font-bakbak font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            1
          </h3>
          <div className="mb-5">
            <div className="flex flex-col">
              <h2 className="font-bakbak font-bold md:text-[16px] text-3xl text-white">
                Mint a Prism NFT
              </h2>
              <p className="text-[8px] md:text-[10px] text-slate-300">
                Owning a Prism NFT is the gateway into the Prism ecosystem.
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <Link legacyBehavior href="#navbar">
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                >
                  <span className="font-bold text-xs text-white">MINT</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", "spring", 0.8, 2)}
          className="flex flex-row justify-center mx-auto items-end md:mx-auto gap-2"
        >
          <div className="mb-5">
            <div className="flex flex-col">
              <h2 className="font-bakbak font-bold md:text-[16px] text-3xl text-white">
                Trade Prism NFTs
              </h2>
              <p className="text-[8px] md:text-[10px] text-slate-300">
                List Prism NFTs on our Prism NFT marketplace.
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <Link legacyBehavior href="/trade">
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                >
                  <span className="font-bold text-xs text-white">TRADE</span>
                </button>
              </Link>
            </div>
          </div>
          <h3 className="font-bakbak font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            2
          </h3>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.8, 2)}
          className="flex flex-row justify-center mx-auto items-end md:mx-auto gap-3"
        >
          <h3 className="font-bakbak font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            3
          </h3>
          <div className="mb-5">
            <div className="flex flex-col">
              <h2 className="font-bakbak font-bold md:text-[16px] text-3xl text-white">
                Stake & Earn
              </h2>
              <p className="text-[8px] md:text-[10px] text-slate-300">
                Stake your Prism NFT to start earning. Rewards distributed in
                $PRISM
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <Link legacyBehavior href="/stake">
                <button
                  type="button"
                  className="flex items-center h-fit py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                >
                  <span className="font-bold text-xs text-white">STAKE</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default Features;
