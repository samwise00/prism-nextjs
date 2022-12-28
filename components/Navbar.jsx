"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

import { ConnectButton } from "web3uikit";

const Navbar = () => (
  <div className="bg-black">
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between md:gap-16 gap-6`}
      >
        <Link legacyBehavior href="/">
          <h2 className="font-geo font-extrabold mt-3 md:text-[30px] text-[24px] leading-[30.24px] text-white">
            Prism<span className="text-pink-500">.</span>
          </h2>
        </Link>
        <div className="text-white flex flex-row">
          <div className="flex md:flex-row gap-6">
            <div className="text-white flex flex-row gap-6 mt-4">
              <Link legacyBehavior href="/trade">
                <h3 className="text-xs">Trade</h3>
              </Link>
              <Link legacyBehavior href="/stake">
                <h3 className="text-xs">Stake</h3>
              </Link>
            </div>
            <div className="flex justify-start items-center mx-auto mb-4">
              <ConnectButton className="z-20" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  </div>
);

export default Navbar;
