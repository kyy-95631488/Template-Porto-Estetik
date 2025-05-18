"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Socials from "../components/Socials";

const Header = () => {
  const headerRef = useRef(null);
  const [username, setUsername] = useState("");

  // Measure header height and set CSS variable
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    }
  }, [username]);

  useEffect(() => {
    fetch("https://portoku.live/api/v1/visitor/testbug", {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error && result.data?.userData?.username) {
          setUsername(result.data.userData.username);
        }
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <header
      id="site-header"
      ref={headerRef}
      className="absolute z-30 top-0 w-full px-4 md:px-16 xl:px-0 xl:h-[90px]"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          <Link href="/" className="text-2xl font-bold text-white">
            {username || "Loading..."}
          </Link>
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;