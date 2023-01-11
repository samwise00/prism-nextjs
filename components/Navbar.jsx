"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import Link from "next/link";

import { resolve } from "url";

import React, { useMemo } from "react";

import { ConnectButton } from "web3uikit";

const BaseLink = ({ href, as, ...rest }) => {
  const newAs = useMemo(() => {
    let baseURI_as = as || href;

    // make absolute url relative
    // when displayed in url bar
    if (baseURI_as.startsWith("/")) {
      //  for static html compilation
      baseURI_as = "." + href;
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

      // on the client
      if (typeof document !== "undefined") {
        baseURI_as = resolve(document.baseURI, baseURI_as);
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }
    return baseURI_as;
  }, [as, href]);

  return <Link {...rest} href={href} as={newAs} />;
};

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
        <BaseLink href="/">
          <h2 className="font-geo font-extrabold py-2 md:text-[30px] text-[24px] leading-[30.24px] text-white cursor-pointer">
            Prism<span className="text-pink-500">.</span>
          </h2>
        </BaseLink>
        <div className="text-white flex flex-row">
          <div className="flex md:flex-row gap-2">
            <div className="text-white flex flex-row md:gap-6 gap-2 mt-4">
              <BaseLink legacyBehavior href="/trade">
                <h3 className="text-xs cursor-pointer">Trade</h3>
              </BaseLink>
              <BaseLink legacyBehavior href="/stake">
                <h3 className="text-xs cursor-pointer">Stake</h3>
              </BaseLink>
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
