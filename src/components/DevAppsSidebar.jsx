import { useState } from "react";
import foremLogo from "@/assets/forem-logo.jpg";
import futureLogo from "@/assets/future-logo.jpg";
import devLogo from "@/assets/dev-logo.png";
import openForem from "@/assets/open-logo.png";
import scaleLogo from "@/assets/scale-logo.jpg";
import securityLogo from "@/assets/security-logo.jpg";
import vibeLogo from "@/assets/vibe-logo.jpg";
import popcorn from "@/assets/popcorn-logo.jpg";
import parentingLogo from "@/assets/parenting-logo.jpg";
import musicLogo from "@/assets/music-logo.jpg";
import makerLogo from "@/assets/maker-logo.jpg";
import golfLogo from "@/assets/golf-logo.jpg";
import gamersLogo from "@/assets/gamers-logo.jpg";
import designLogo from "@/assets/design-logo.jpg";
import cryptoLogo from "@/assets/crypto-logo.jpg";
import hmplLogo from "@/assets/hmpl-logo.jpg";
import dumbLogo from "@/assets/dumb-logo.jpg";
import Forem from "@/assets/forem-thumbnail.jpg";
import DEV from "@/assets/DEV-thumbnail.jpg";
import Future from "@/assets/Future-thumbnail.jpg";
import OpenForem from "@/assets/Open-forem-thumbnail.jpg";
import Scale from "@/assets/Scale-thumbnail.jpg";
import Security from "@/assets/Security-thumbnail.jpg";
import Vibe from "@/assets/Vibe-thumbnail.jpg";
import Popcorn from "@/assets/Popcorn-thumbnail.jpg";
import Parenting from "@/assets/Parenting-thumbnail.jpg";
import Music from "@/assets/Music-thumbnail.jpg";
import HMPL from "@/assets/HMPL-thumbnail.jpg";
import Maker from "@/assets/Maker-thumbnail.jpg";
import Golf from "@/assets/Golf-thumbnail.jpg";
import Gamers from "@/assets/Gamers-thumbnail.jpg";
import Design from "@/assets/Design-thumbnail.jpg";
import Crypto from "@/assets/Crypto-thumbnail.jpg";
import Dumb from "@/assets/Dumb-thumbnail.jpg";

export default function DevAppsSidebar() {
  const [hovered, setHovered] = useState(null);

  const apps = [
    {
      id: 1,
      name: "Forem",
      image: foremLogo,
      thumbnail: Forem,
      desc: "The open source platform behind DEV.",
    },
    {
      id: 2,
      name: "Future",
      image: futureLogo,
      thumbnail: Future,
      desc: "Exploring what’s next for DEV.",
    },
    {
      id: 3,
      name: "DEV",
      image: devLogo,
      thumbnail: DEV,
      desc: "A constructive and inclusive community.",
    },
    {
      id: 4,
      name: "OpenForem",
      image: openForem,
      thumbnail: OpenForem,
      desc: "Build your own community platform.",
    },
    {
      id: 5,
      name: "Scale",
      image: scaleLogo,
      thumbnail: Scale,
      desc: "Scaling communities and platforms.",
    },
    {
      id: 6,
      name: "Security",
      image: securityLogo,
      thumbnail: Security,
      desc: "Security discussions and resources.",
    },
    {
      id: 7,
      name: "Vibe",
      image: vibeLogo,
      thumbnail: Vibe,
      desc: "Culture, vibes, and conversations.",
    },
    {
      id: 8,
      name: "Popcorn",
      image: popcorn,
      thumbnail: Popcorn,
      desc: "Fun and entertainment on DEV.",
    },
    {
      id: 9,
      name: "Parenting",
      image: parentingLogo,
      thumbnail: Parenting,
      desc: "Tech & parenting experiences.",
    },
    {
      id: 10,
      name: "Music",
      image: musicLogo,
      thumbnail: Music,
      desc: "Music creators and lovers.",
    },
    {
      id: 11,
      name: "HMPL",
      image: hmplLogo,
      thumbnail: HMPL,
      desc: "Minimal and human-friendly markup.",
    },
    {
      id: 12,
      name: "Maker",
      image: makerLogo,
      thumbnail: Maker,
      desc: "Makers building cool things.",
    },
    {
      id: 13,
      name: "Golf",
      image: golfLogo,
      thumbnail: Golf,
      desc: "Golf stories and tech.",
    },
    {
      id: 14,
      name: "Gamers",
      image: gamersLogo,
      thumbnail: Gamers,
      desc: "Gaming culture and devs.",
    },
    {
      id: 15,
      name: "Design",
      image: designLogo,
      thumbnail: Design,
      desc: "Design systems & creativity.",
    },
    {
      id: 16,
      name: "Crypto",
      image: cryptoLogo,
      thumbnail: Crypto,
      desc: "Blockchain and crypto tech.",
    },
    {
      id: 17,
      name: "Dumb",
      image: dumbLogo,
      thumbnail: Dumb,
      desc: "Intentionally dumb fun stuff.",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[56px] border-r border-gray-200 bg-white z-50 flex flex-col items-center">
      <div className="flex-1 py-3 space-y-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="relative"
            onMouseEnter={() => setHovered(app.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* ICON */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 cursor-pointer">
              <img
                src={app.image}
                alt={app.name}
                className="w-8 h-8 rounded-md"
              />
            </div>

            {/* HOVER CARD */}
            <div
              className={`
    absolute left-[40px] top-1/4 -translate-y-1/4
    w-80 bg-white border border-gray-200 shadow-2xl
    rounded-md overflow-hidden
    transition-all duration-150
    ${
      hovered === app.id
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
            >
              {/* IMAGE / COVER (TOP HALF) */}
              <div className="h-auto w-full bg-gray-100 flex items-center justify-center">
                <img
                  src={app.thumbnail || app.image}
                  alt={app.name}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                {/* TITLE */}
                <h4 className="text-sm font-bold text-gray-900 text-left">
                  {app.name}
                </h4>

                {/* FOLLOW BUTTON */}
                <button
                  className="
        w-full
        text-sm font-medium
        text-white bg-indigo-500
        border border-indigo-600
        rounded-md
        py-1.5
        hover:bg-indigo-50
        transition
      "
                >
                  Follow
                </button>

                {/* DESCRIPTION (BOTTOM) */}
                <p className="text-xs text-gray-600 text-left leading-relaxed">
                  {app.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
