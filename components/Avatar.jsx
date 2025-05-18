"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

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
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
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
    return (
      <div
        className={`${className} hidden xl:flex`}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Shimmer className="absolute inset-0 w-full h-full rounded-full" />
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <div
      className={`hidden xl:flex xl:max-w-none pointer-events-none select-none overflow-hidden rounded-full ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={737}
        height={678}
        className="w-full h-full object-cover"
        style={{ position: "relative", zIndex: 1 }}
      />
    </div>
  );
};

export default Avatar;
