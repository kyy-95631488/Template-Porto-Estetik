import { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user data and set the username state
    fetch("https://portoku.live/api/v1/visitor/testbug")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.data.userData.username);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>{username ? `${username} | Portfolio` : "Loading..."}</title>
        <meta
          name="keywords"
          content="react, next, nextjs, html, css, javascript, js, modern-ui, modern-ux, portfolio, framer-motion, 3d-website, particle-effect"
        />
        <meta name="theme-color" content="#f13024" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
