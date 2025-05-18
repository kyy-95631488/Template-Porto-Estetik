"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiPinterestLine,
} from "react-icons/ri";

const iconMap = {
  instagram: RiInstagramLine,
  facebook: RiFacebookLine,
  linkedin: RiLinkedinBoxLine,
  github: RiGithubLine,
  youtube: RiYoutubeLine,
  pinterest: RiPinterestLine,
};

const Socials = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch("https://portoku.live/api/v1/visitor/testbug");
        const data = await response.json();
        const socialMedia = data.data.userDetailData.socialMedia;

        // Convert object to array
        const socialArray = Object.entries(socialMedia).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          link: value,
          Icon: iconMap[key.toLowerCase()],
        }));

        setSocials(socialArray);
      } catch (error) {
        console.error("Failed to fetch social media:", error);
      }
    };

    fetchSocials();
  }, []);

  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socials.map(
        (social, i) =>
          social.Icon && (
            <Link
              key={i}
              title={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer noopener"
              className={`${
                social.name.toLowerCase() === "github"
                  ? "bg-accent rounded-full p-[5px] hover:text-white"
                  : "hover:text-accent"
              } transition-all duration-300`}
            >
              <social.Icon aria-hidden />
              <span className="sr-only">{social.name}</span>
            </Link>
          )
      )}
    </div>
  );
};

export default Socials;
