"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { Shimmer } from "../../components/Shimmer";

export default function About() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.getElementById("site-header");
      if (headerEl) setHeaderHeight(headerEl.offsetHeight);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://portoku.live/api/v1/visitor/testbug")
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section
        style={{ paddingTop: headerHeight }}
        className="relative overflow-hidden py-20 md:py-32 min-h-screen bg-gradient-to-tr from-primary/50 to-primary/20"
      >
        <Circles />
        <div className="container mx-auto flex flex-col xl:flex-row items-center gap-12 px-4">
          <div className="w-full xl:w-2/3 flex flex-col space-y-6">
            <Shimmer className="h-12 w-3/4 mx-auto xl:mx-0 rounded-full" />
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Shimmer key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          </div>
          <Shimmer className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 xl:w-80 xl:h-80 rounded-full" />
        </div>
      </section>
    );
  }

  if (error) return <div className="text-center py-32 text-xl">Failed to load data.</div>;

  const { userData, userSkillData } = data;

  return (
    <section
      style={{ paddingTop: headerHeight }}
      className="relative overflow-hidden py-20 md:py-32 min-h-screen bg-gradient-to-tr from-primary/50 to-primary/20"
    >
      <Circles />
      <div className="container mx-auto flex flex-col xl:flex-row items-center gap-12 px-4">
        <div className="w-full xl:w-2/3 flex flex-col">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center xl:text-left"
          >
            Hi, I’m <span className="text-accent">{userData.name}</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="text-white/90 mb-8 max-w-xl mx-auto xl:mx-0 text-center xl:text-left text-lg sm:text-xl"
          >
            {userData.overview}
          </motion.p>

          {/* Skill container */}
          <div className="flex-1 max-h-[38vh] md:max-h-[60vh] overflow-y-auto hide-scrollbar space-y-8">
            <motion.div variants={fadeIn("up", 0)} initial="hidden" animate="show">
              {Object.entries(userSkillData.skills).map(
                ([cat, skills]) =>
                  skills.length > 0 && (
                    <div key={cat} className="mb-8">
                      <h3 className="text-2xl font-semibold text-white mb-4">
                        {cat.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {skills.map((s, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center bg-white/10 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                          >
                            <img
                              src={s.darkColorPath}
                              alt={s.name}
                              className="w-16 h-16 mb-3"
                            />
                            <span className="text-white text-lg">{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </div>
        </div>

        {/* Modern Avatar */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative w-full xl:w-1/3 flex justify-center xl:justify-end"
        >
          {/* Gradient Border & Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 blur-xl opacity-60 animate-pulse"></div>
          <div className="relative p-1 bg-transparent rounded-full overflow-hidden">
            <Avatar
              src={
                userData.image ||
                "https://via.placeholder.com/300x300.png?text=No+Image"
              }
              alt={userData.name}
              className="w-64 h-64 rounded-full shadow-2xl object-cover border-4 border-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
