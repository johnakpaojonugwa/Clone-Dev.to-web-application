import Algolia from "@/assets/algolia-logo.jpg";
import Google from "@/assets/google-ai.jpg";
import Neon from "@/assets/neon-logo.jpg";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-200 border-t border-gray-200">
      <div className="max-w-[1380px] mx-auto px-4 py-8">
        {/* Sponsors */}
        <div className="max-w-4xl mx-auto mb-8 bg-white border border-gray-200 rounded-lg px-6 py-5">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-gray-900">
              💎 DEV Diamond Sponsors
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Thank you to our Diamond Sponsors for supporting the DEV Community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Google */}
            <div className="flex flex-col items-center text-center">
              <img
                src={Google}
                alt="Google AI"
                className="h-12 mb-3 object-contain"
              />
              <p className="text-xs text-gray-500 italic leading-relaxed">
                Google AI is the official AI Model and Platform Partner of DEV
              </p>
            </div>

            {/* Neon */}
            <div className="flex flex-col items-center text-center">
              <img src={Neon} alt="Neon" className="h-12 mb-3 object-contain" />
              <p className="text-xs text-gray-500 italic leading-relaxed">
                Neon is the official Postgres Partner of DEV
              </p>
            </div>

            {/* Algolia */}
            <div className="flex flex-col items-center text-center">
              <img
                src={Algolia}
                alt="Algolia"
                className="h-12 mb-3 object-contain"
              />
              <p className="text-xs text-gray-500 italic leading-relaxed">
                Algolia is the official Search Partner of DEV
              </p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div>
          <p className="text-center text-sm text-gray-700 mb-2">
            <span className="text-indigo-500 cursor-pointer hover:underline">
              DEV Community
            </span>{" "}
            — A space to discuss and keep up software development and manage
            your software career
          </p>
        </div>
        <div className="text-center text-sm text-gray-600 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Home
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              DEV++
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Podcasts
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Videos
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              DEV Education Tracks
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              DEV Challenges
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              DEV Help
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Advertise on DEV
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              DEV Showcase
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              About
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Free Postgres Database
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Software comparisons
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Forem Shop
            </a>
          </div>

          <div className="space-x-3">
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Code of Conduct
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Terms of Use
            </a>
          </div>

          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            DEV Community — A constructive and inclusive social network for
            software developers. Built on Forem — the open source software that
            powers DEV and other inclusive communities.
          </p>

          <p className="text-sm text-gray-500">
            Made with love and Ruby on Rails. DEV Community © 2016 – 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}
