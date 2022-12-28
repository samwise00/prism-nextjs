"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { slideIn, staggerContainer, fadeIn } from "../utils/motion";
import { socials } from "../constants";

import { TypingText } from "../components";

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-row space-between`}
    >
      <div className="flex flex-col relative z-10 max-w-[40%] md:mt-40 md:ml-28 mt-14 ml-8">
        <motion.div
          variants={slideIn("left", "tween", 0.9, 1.2)}
          className={`${styles.heroHeading} text-white z-9`}
        >
          <div className="flex flex-row space-between">
            <TypingText
              title="&mdash; PRISM PROJECT &mdash;"
              textStyles="text-white font-geo text-pink-500 sm:text-[12px]"
              delay={0}
            />
          </div>
          <div className="font-bakbak font-bold md:text-[36px] sm:text-[12px] max-w-[650px] text-white">
            MINTING, STAKING, TRADING, EARNING. POWERED BY $PRISM
            <span className="text-pink-500">.</span>
          </div>
          <div className="text-[10px] mt-4">
            It's the year 2096 AD and the AI robots have begun their mutiny of
            sociopolitical and economic systems. The only hope are the Prisms,
            an elite group armed with the tech and the NFTs to fight back. Are
            you the baddest NFT collector around? Mint a Prism. to find out.
          </div>
          <div className="flex flex-row mt-[24px] gap-6">
            <button
              type="button"
              className="flex items-center h-fit py-2 px-8 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
            >
              <span className="font-normal text-xs text-white">MINT</span>
            </button>
            <button
              type="button"
              className="flex items-center h-fit py-2 px-8 bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
            >
              <span className="font-normal text-xs text-white">BUY $PRISM</span>
            </button>
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn()}
          className={`${styles.heroHeading} text-white`}
        ></motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 1.5, 2)}
        className="justify-end w-[50%] md:-mt-[20px] -mt-[12px] z-10"
      >
        <img
          src="/prismhero.png"
          alt="cover"
          className="w-[60%] sm:h-[500px] h-[300px] object-cover z-10 justify-end ml-20 mt-12"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
