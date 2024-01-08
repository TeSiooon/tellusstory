import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
const TestNav = () => {
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <Link href="/">TELL US STORY</Link>
        </div>

        {/* Menu na dużych ekranach */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href={"/"}>Main</Link>
          </li>
          <li>
            <Link href="/">Poczekalnia</Link>
          </li>
          <li>
            {status === "unauthenticated" && (
              <button onClick={signIn}>Login</button>
            )}
            {status === "authenticated" && (
              <button onClick={signOut}>
                Sing out{" "}
                <span className="font-bold text-[#E98074]">
                  ({session.user.name})
                </span>
              </button>
            )}
          </li>
          {status === "authenticated" && (
            <li>
              <Link href="/new-story">Dodaj</Link>
            </li>
          )}
        </ul>

        {/* Ikona menu na małych ekranach */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Menu na małych ekranach (widoczne po kliknięciu) */}
      {/* Naprawic animacje  */}
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden top-16 right-4 bg-gray-700 p-4"
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/">Main</Link>
            </li>
            <li>
              <Link href="/">Poczekalnia</Link>
            </li>
            <li>
              {status === "unauthenticated" && (
                <button onClick={signIn}>Login</button>
              )}
              {status === "authenticated" && (
                <button onClick={signOut}>
                  Sign out{" "}
                  <span className="font-bold text-[#E98074]">
                    ({session.user.name})
                  </span>
                </button>
              )}
            </li>
            {status === "authenticated" && (
              <li>
                <Link href="/new-story">Dodaj</Link>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
export default TestNav;
