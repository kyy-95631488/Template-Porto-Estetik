"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { Shimmer } from "../../components/Shimmer";

export default function Experience() {
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
      .then((json) => setData(json.data.userExperienceData))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section style={{ paddingTop: headerHeight }} className="relative overflow-hidden py-20 md:py-32 min-h-screen bg-gradient-to-tr from-primary/40 to-primary/10">
        <Circles />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Shimmer key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div className="text-center py-32 text-red-500">Failed to load experience data.</div>;

  return (
    <section style={{ paddingTop: headerHeight }} className="relative overflow-hidden py-20 md:py-32 min-h-screen bg-gradient-to-tr from-primary/40 to-primary/10">
      <Circles />
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeIn("down", 0.2)} initial="hidden" animate="show"
          className="text-4xl sm:text-5xl font-extrabold text-white mb-12 text-center"
        >Experience</motion.h2>

        <div className="space-y-10">
          {data.map((e, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", i * 0.1)}
              initial="hidden"
              animate="show"
              className="flex flex-col md:flex-row items-start md:items-center bg-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-4 h-4 bg-accent rounded-full mt-2"></div>
                <div className="h-full w-px bg-white/20 mx-auto"></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h4 className="text-xl font-semibold text-white">{e.position}</h4>
                  <span className="text-sm text-white/60 uppercase">
                    {new Date(e.startDate).toLocaleDateString()} - {e.endDate ? new Date(e.endDate).toLocaleDateString() : "Present"}
                  </span>
                </div>
                <div className="text-accent font-medium mb-2">{e.organizationName}</div>
                <p className="text-white/80 mb-2">{e.overview}</p>
                {e.dotPoint?.length > 0 && (
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    {e.dotPoint.map((pt, idx) => <li key={idx}>{pt}</li>)}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
