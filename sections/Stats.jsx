"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";

import { TypingText } from "../components";

import styles from "../styles";

const Stats = () => (
  <section className={`${styles.yPaddings} mx-auto md:max-w-[900px] w-full`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col justify-center items-center mx-auto"
    >
      <TypingText
        title="&mdash; STATS &mdash;"
        textStyles="font-geo text-pink-500 md:text-[12px] text-xs my-2"
        delay={1}
      />
      <motion.div
        variants={fadeIn("up", "spring", 1.5, 2)}
        className="flex flex-row justify-center items-center mx-10 gap-4 gap-y-2 md:gap-x-4 md:min-w-[700px] w-full"
      >
        <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
          <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
            <p className="text-[8px] text-slate-300">NFTs Minted</p>
            <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
              5
            </h3>
          </div>
        </div>
        <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
          <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
            <p className="text-[8px] text-slate-300">$PRISM PRICE</p>
            <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
              .0345
            </h3>
          </div>
        </div>
        <div className="h-28 w-full rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px] max-w-[120px] md:max-w-[220px]">
          <div className="flex flex-col justify-center items-center h-full w-full rounded-lg bg-[rgb(31,32,32)] mx-auto">
            <p className="text-[8px] text-slate-300">Market Cap</p>
            <h3 className="font-bakbak font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
              2.7M
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default Stats;
