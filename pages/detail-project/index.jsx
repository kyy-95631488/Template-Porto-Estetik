"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { Shimmer } from "../../components/Shimmer";

export default function DetailProjectPage() {
  const router = useRouter();
  const { username, projectId } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !projectId) return;

    setLoading(true);
    fetch(
      `https://portoku.live/api/v1/visitor/${username}/projects/${projectId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(({ data }) => setProject(data))
      .catch((err) => setError(err.message || "Failed to load data"))
      .finally(() => setLoading(false));
  }, [username, projectId]);

  if (loading) {
    return (
      <section className="h-full bg-primary/30 py-36 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Shimmer className="h-64 rounded-2xl mb-4" />
          <Shimmer className="h-6 w-3/4 rounded-md mb-2" />
          <Shimmer className="h-4 w-full rounded-md" />
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="h-full bg-primary/30 py-36 flex items-center justify-center">
        <p className="text-white text-center">{error || "Project not found."}</p>
      </section>
    );
  }

  const {
    name,
    overview,
    linkProject,
    mediaLinks = [],
    projectOverview,
    toolsUsed = [],
  } = project;

  return (
    <section className="min-h-screen bg-primary/30 py-20 relative">
      <Circles />
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="text-5xl font-extrabold text-white mb-6"
        >
          {name}
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="text-white/80 max-w-3xl mb-8"
        >
          {overview}
        </motion.p>

        {/* Media Gallery */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {mediaLinks.map((link, idx) =>
            link.includes("youtube") || link.includes("youtu.be") ? (
              <div key={idx} className="aspect-video w-full rounded-2xl overflow-hidden">
                <iframe
                  src={link}
                  title={`video-${idx}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <img
                key={idx}
                src={link}
                alt={`${name}-media-${idx}`}
                className="w-full h-64 object-cover rounded-2xl"
              />
            )
          )}
        </motion.div>

        {/* Detailed Overview */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          animate="show"
          className="bg-white/10 p-6 rounded-2xl mb-10 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Project Details
          </h3>
          <p className="text-white/80 leading-relaxed">
            {projectOverview}
          </p>
        </motion.div>

        {/* Tools Used */}
        <motion.div
          variants={fadeIn("up", 1)}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <h4 className="text-xl font-semibold text-white mb-3">
            Tools & Technologies
          </h4>
          <div className="flex flex-wrap gap-3">
            {toolsUsed.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* External Link */}
        <motion.a
          href={linkProject}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeIn("up", 1.2)}
          initial="hidden"
          animate="show"
          className="inline-block bg-accent text-primary font-semibold py-3 px-6 rounded-2xl hover:opacity-90 transition-opacity"
        >
          View Project
        </motion.a>
      </div>
      <Bulb />
    </section>
  );
}