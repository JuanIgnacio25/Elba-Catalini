"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import NavBarHeader from "@/components/NavBar/NavBarHeader";
import NavMain from "@/components/NavBar/NavMain";

function NavBar() {
  const [showFixedNav, setShowFixedNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNav(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Original Navbar (with header) */}
      <div className="nav-bar-container">
        <NavBarHeader />
        <NavMain isScrolled={false}/>
      </div>

      {/* Fixed Navbar only with NavMain */}
      <AnimatePresence>
        {showFixedNav && (
          <motion.div
            key="fixed-nav"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-[1000] bg-neutral-900 shadow-md"
          >
            <NavMain isScrolled={true}/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
