// app/components/Avatar.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

/**
 * Avatar component with shimmer while fetching.
 */
const Avatar = ({ src, alt, className = "" }) => {
  const [imageUrl, setImageUrl] = useState(src || null);
  const [loading, setLoading] = useState(!src);

  useEffect(() => {
    if (src) {
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          "https://portoku.live/api/v1/visitor/testbug"
        );
        const data = await res.json();
        const url = data?.data?.userData?.image;
        if (url) setImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [src]);

  if (loading) {
    return <Shimmer className={`${className} hidden xl:flex`} />;
  }
  if (!imageUrl) return null;

  return (
    <div
      className={`
        hidden xl:flex xl:max-w-none pointer-events-none select-none overflow-hidden rounded-full ${className}
      `}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={737}
        height={678}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
