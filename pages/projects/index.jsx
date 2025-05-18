"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { Shimmer } from "../../components/Shimmer";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "testbug";

  useEffect(() => {
    fetch("https://portoku.live/api/v1/visitor/testbug")
      .then((r) => r.json())
      .then(({ data }) => setProjects(data.userProjectData))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (error)
    return <div className="text-center py-32">Failed to load projects.</div>;

  return (
    <section className="h-full bg-primary/30 py-36 flex flex-col items-center relative">
      <Circles />

      {/* Header */}
      <div className="container mx-auto mb-12 text-center">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="text-4xl font-extrabold text-white mb-4"
        >
          My Projects <span className="text-accent">.</span>
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="max-w-[500px] mx-auto text-white/80"
        >
          Berikut kumpulan project yang pernah saya kerjakan. Klik masing-masing untuk melihat detail.
        </motion.p>
      </div>

      {/* Content */}
      <div className="container mx-auto flex-1 px-4">
        {loading ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
          >
            {[...Array(6)].map((_, i) => (
              <Shimmer key={i} className="h-64 rounded-2xl" />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
          >
            {projects.map((p) => (
              <Link
                key={p._id}
                href={`/detail-project?username=${username}&projectId=${p._id}`}
                passHref
              >
                <motion.a
                  className="block bg-white/10 p-4 rounded-2xl shadow-md hover:shadow-2xl transition-shadow"
                  variants={fadeIn("up", 0)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <span className="block text-xl font-semibold text-accent hover:underline mb-2">
                    {p.name}
                  </span>
                  <p className="text-white/80 text-sm mb-2">{p.overview}</p>
                </motion.a>
              </Link>
            ))}
          </motion.div>
        )}
      </div>

      <Bulb />
    </section>
  );
}