"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { Shimmer } from "../../components/Shimmer";

export default function Education() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update header & bottom-nav height
  useEffect(() => {
    const updateHeights = () => {
      const headerEl = document.getElementById("site-header");
      const navEl = document.getElementById("site-nav");
      setHeaderHeight(headerEl?.offsetHeight || 0);
      setNavHeight(navEl?.offsetHeight || 0);
    };
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  // Fetch data
  useEffect(() => {
    fetch("https://portoku.live/api/v1/visitor/testbug")
      .then((r) => r.json())
      .then((json) => setData(json.data.userEducationData || []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Padding top & bottom
  const sectionStyle = {
    paddingTop: headerHeight,
    paddingBottom: navHeight,
    backgroundAttachment: "fixed", // fallback jika Tailwind tidak tersedia
  };

  // Hitung maxHeight untuk scrollable container:
  const verticalPadding = 87 * 2; // atas + bawah = 174px kira-kira
  const scrollMaxHeight = `calc(100vh - ${headerHeight}px - ${navHeight}px - ${verticalPadding}px)`;

  if (loading) {
    return (
      <section
        style={sectionStyle}
        className="relative bg-fixed bg-gradient-to-tr from-secondary/30 to-secondary/10 overflow-hidden py-20 md:py-32 min-h-screen"
      >
        <Circles />
        <div className="container mx-auto px-4">
          <Shimmer className="h-12 w-1/2 mx-auto rounded-full mb-12" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Shimmer key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        ❌ Failed to load education data.
      </div>
    );
  }

  return (
    <section
      style={sectionStyle}
      className="relative bg-fixed bg-gradient-to-tr from-secondary/30 to-secondary/10 overflow-hidden py-20 md:py-32 min-h-screen"
    >
      <Circles />
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="text-4xl font-extrabold text-white text-center mb-12"
        >
          My <span className="text-accent">Education</span>
        </motion.h2>

        <div className="relative">
          {/* Garis vertikal hanya tampil di ≥md dan selalu di tengah */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-3 bg-white/20 w-1 h-full"></div>

          {/* Wrapper scrollable tanpa menampilkan scrollbar */}
          <div
            className="space-y-12 overflow-y-auto pr-4 scrollbar-hide"
            style={{ maxHeight: scrollMaxHeight }}
          >
            {data.map((ed, i) => (
              <motion.div
                key={i}
                variants={fadeIn(i % 2 === 0 ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold text-white">
                        {ed.degree}
                      </h3>
                      <span className="text-sm text-white/60 uppercase">
                        {new Date(ed.startDate).toLocaleDateString()} -{" "}
                        {ed.endDate
                          ? new Date(ed.endDate).toLocaleDateString()
                          : "Present"}
                      </span>
                    </div>
                    <h4 className="text-xl text-accent font-medium mb-2">
                      {ed.school}
                    </h4>
                    <p className="text-white/80 mb-4">{ed.overview}</p>
                    {ed.dotPoint?.length > 0 && (
                      <ul className="list-disc list-inside text-white/80 space-y-1">
                        {ed.dotPoint.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="hidden md:block w-1/12 relative">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-accent w-4 h-4 rounded-full border-4 border-secondary"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
