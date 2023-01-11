"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import Link from "next/link";

import { ConnectButton } from "web3uikit";

const Navbar = () => (
  <div className="bg-black">
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-6 relative`}
    >
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between md:gap-16 gap-4`}
        id="navbar"
      >
        <Link href="/">
          <h2 className="font-geo font-extrabold py-2 md:text-[30px] text-[24px] leading-[30.24px] text-white cursor-pointer">
            Prism<span className="text-pink-500">.</span>
          </h2>
        </Link>
        <div className="text-white flex flex-row">
          <div className="flex md:flex-row gap-2">
            <div className="text-white flex flex-row md:gap-6 gap-2 mt-4">
              <Link legacyBehavior href="/trade" shallow>
                <h3 className="text-xs cursor-pointer">Trade</h3>
              </Link>
              <Link legacyBehavior href="/stake" shallow>
                <h3 className="text-xs cursor-pointer">Stake</h3>
              </Link>
            </div>
          </div>
          <div className="flex justify-start items-center mx-auto mb-4">
            <ConnectButton className="z-20" />
          </div>
        </div>
      </div>
    </motion.nav>
  </div>
);

export default Navbar;
