"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { socials } from "../constants";
import { footerVariants } from "../utils/motion";

const Footer = () => {
  return (
    <section className="py-6 bg-black">
      <div className="bg-black">
        <motion.nav
          variants={footerVariants}
          initial="hidden"
          whileInView="show"
          className={`${styles.xPaddings} py-2 relative`}
        >
          <div
            className={`${styles.innerWidth} mx-auto flex justify-between gap-16`}
          >
            <h2 className="font-geo font-extrabold text-[30px] leading-[30.24px] text-white">
              Prism<span className="text-pink-500">.</span>
            </h2>
            <div className="text-white flex flex-row gap-8">
              <div className="text-white flex flex-row gap-6 py-2">
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
          </div>
          <div className="text-slate-600">
            Built with: Solidity, Hardhat, Chainlink VRF, TheGraph, Next.js,
            Framer Motion, TailwindCSS
          </div>
        </motion.nav>
      </div>
    </section>
  );
};

export default Footer;
