import Algolia from "@/assets/algolia-logo.jpg";
import Google from "@/assets/google-ai.jpg";
import Neon from "@/assets/neon-logo.jpg";
import { RiSettingsLine } from "react-icons/ri";
import {
  FaHome,
  FaPlus,
  FaBook,
  FaPodcast,
  FaVideo,
  FaGraduationCap,
  FaTrophy,
  FaLifeRing,
  FaHeart,
  FaStar,
  FaSmile,
  FaPhoneAlt,
  FaShoppingBag,
  FaThumbsUp,
  FaUserSecret,
  FaFileContract,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitch,
  FaMastodon,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { FiMoreHorizontal } from "react-icons/fi";

export default function LeftSidebar() {
  return (
    <div className="space-y-2">
      {/* MAIN NAV */}
      <nav className="space-y-2">
        <SidebarItem icon={<FaHome size={20} />} label="Home" />
        <SidebarItem icon={<FaPlus size={20} />} label="DEV++" />
        <SidebarItem icon={<FaBook size={20} />} label="Reading List" />
        <SidebarItem icon={<FaPodcast size={20} />} label="Podcasts" />
        <SidebarItem icon={<FaVideo size={20} />} label="Videos" />
        <SidebarItem
          icon={<FaGraduationCap size={20} />}
          label="DEV Education Tracks"
        />
        <SidebarItem icon={<FaTrophy size={20} />} label="DEV Challenges" />
        <SidebarItem icon={<FaLifeRing size={20} />} label="DEV Help" />
        <SidebarItem icon={<FaHeart size={20} />} label="Advertise on DEV" />
        <SidebarItem icon={<FaStar size={20} />} label="DEV Showcase" />
        <SidebarItem icon={<FaSmile size={20} />} label="About" />
        <SidebarItem icon={<FaPhoneAlt size={20} />} label="Contact" />
        <SidebarItem icon={<FaShoppingBag size={20} />} label="Forem Shop" />
      </nav>

      {/* OTHER */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Other</h4>
        <nav className="space-y-2">
          <SidebarItem
            icon={<FaThumbsUp size={20} />}
            label="Code of Conduct"
          />
          <SidebarItem
            icon={<FaUserSecret size={20} />}
            label="Privacy Policy"
          />
          <SidebarItem
            icon={<FaFileContract size={20} />}
            label="Terms of Use"
          />
        </nav>
      </div>
      {/* SOCIAL ICONS */}
      <div className="flex flex-wrap gap-4 text-xl text-gray-600 pt-2">
        <FaTwitter size={16} className="hover:text-black cursor-pointer" />
        <FaFacebook size={16} className="hover:text-black cursor-pointer" />
        <FaGithub size={16} className="hover:text-black cursor-pointer" />
        <FaInstagram size={16} className="hover:text-black cursor-pointer" />
        <FaTwitch size={16} className="hover:text-black cursor-pointer" />
        <SiX size={16} className="hover:text-black cursor-pointer" />
        <FaMastodon size={16} className="hover:text-black cursor-pointer" />
      </div>
      {/* Tags */}
      <div className="flex items-center justify-between p-2 my-4">
        <h2 className="font-medium">My Tags</h2>
        <RiSettingsLine size={18} />
      </div>
      {/* Sponsors */}
      <div className="max-w-4xl mx-auto mb-8 bg-white border border-gray-200 rounded-lg px-6 py-5">
        <div className="text-left mb-6">
          <h3 className="text-sm font-semibold text-gray-900">
            💎 DEV Diamond Sponsors
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Thank you to our Diamond Sponsors for supporting the DEV Community
          </p>
        </div>

        <div className="flex-1 space-y-15">
          {/* Google */}
          <div className="flex flex-col items-center text-center">
            <img
              src={Google}
              alt="Google AI"
              className="h-auto w-full mb-3 object-cover"
            />
            <p className="text-xs text-gray-500 italic leading-relaxed">
              Google AI is the official AI Model and Platform Partner of DEV
            </p>
          </div>

          {/* Neon */}
          <div className="flex flex-col items-center text-center">
            <img
              src={Neon}
              alt="Neon"
              className="h-auto w-full mb-3 object-cover"
            />
            <p className="text-xs text-gray-500 italic leading-relaxed">
              Neon is the official Postgres Partner of DEV
            </p>
          </div>

          {/* Algolia */}
          <div className="flex flex-col items-center text-center">
            <img
              src={Algolia}
              alt="Algolia"
              className="h-auto w-full mb-3 object-cover"
            />
            <p className="text-xs text-gray-500 italic leading-relaxed">
              Algolia is the official Search Partner of DEV
            </p>
          </div>
        </div>
      </div>
      {/* Dev community */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden py-4">
        <div className="flex justify-between items-center px-4 py-3">
          <p className="text-sm text-gray-600 ">DEV Community</p>
          <span>
            <FiMoreHorizontal />
          </span>
        </div>
        <div className="px-4 py-1 space-y-2">
          <h3 className="font-semibold text-xl">
            Easiest way to help the DEV community feel more like a community?
          </h3>
          <p className="text-md text-gray-600">
            Head over to our Welcome Thread greet some new DEV members!
          </p>
        </div>
      </div>
      {/* Footer */}
      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-500"><span className="text-indigo-500 hover:underline cursor-pointer">DEV Community</span> A space to discuss and keep up software development and manage your software career</p>
        <p className="text-sm text-gray-500">Built on Forem — the <span className="text-indigo-500 hover:underline cursor-pointer">open source</span> software that powers DEV and other inclusive communities.</p>
        <p className="text-sm text-gray-500">Made with love and <span className="text-indigo-500 hover:underline cursor-pointer">Ruby on Rails.</span> DEV Community © 2016 - 2025.</p>
      </div>
    </div>
  );
}

/* ITEM COMPONENT */
function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 hover:underline hover:bg-indigo-100 hover:text-indigo-800 rounded-md cursor-pointer">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
