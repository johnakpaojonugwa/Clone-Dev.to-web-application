import { FiMoreHorizontal } from "react-icons/fi";
import MUX from "@/assets/MUX.webp";

export default function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* Layer 1 */}
      <aside className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <h3 className="font-bold text-gray-800 text-xl px-4 py-3 border-b border-gray-200">
          Active discussions
        </h3>

        {/* Item */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">What was your win this week???</p>
          <p className="text-sm text-gray-500 mt-1">10 comments</p>
        </div>

        {/* Item */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">
            A space to discuss and keep up with software development and your
            career.
          </p>
          <p className="text-sm text-gray-500 mt-1">7 comments</p>
        </div>

        {/* Repeatable items */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">
            The 12 Developer Mindset I Have Seen in My Career(And What They
            Teach us About Building a Software).
          </p>
          <p className="text-sm text-gray-500 mt-1">20 comments</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">How to Become An AWS Community Builder.</p>
          <p className="text-sm text-gray-500 mt-1">11 comments</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">Welcome thread v356.</p>
          <p className="text-sm text-gray-500 mt-1">5 comments</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">
            Bifrost: The LLM Gateway that is 40x faster than LiteLLM.
          </p>
          <p className="text-sm text-gray-500 mt-1">12 comments</p>
        </div>
      </aside>

      {/* Layer 2 */}
      <aside className="bg-white rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3">
          <h3 className="text-gray-600 text-sm">
            👋 What's happening this week??
          </h3>
          <span>
            {" "}
            <FiMoreHorizontal />{" "}
          </span>
        </div>
        {/* Livestreams Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Livestreams 📹
          </h3>
          <div className="border border-black rounded-md px-4 py-3 bg-white">
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>December 16</strong>
                <div className="ml-4">
                  • 11 AM ET:{" "}
                  <span className="text-indigo-700 font-medium underline">
                    AWS Security LIVE!
                  </span>
                </div>
              </li>
              <li>
                <strong>December 17</strong>
                <div className="ml-4">
                  • 11 AM ET:{" "}
                  <span className="text-indigo-700 font-medium underline">
                    AWS AI LIVE!
                  </span>
                </div>
              </li>
              <li>
                <strong>December 19</strong>
                <div className="ml-4">
                  • 3 PM ET:{" "}
                  <span className="text-indigo-700 font-medium underline">
                    AWS OnAir
                  </span>
                </div>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Click the link above or view directly from the{" "}
              <span className="text-indigo-600 underline cursor-pointer">
                DEV Homepage
              </span>
              !
            </p>
          </div>
        </div>

        {/* Challenges Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Challenges 🤗
          </h3>

          <div className="bg-white px-4 py-3 border border-black rounded-md shadow-sm">
            <p className="text-gray-600 mb-4">Show us your projects 🌟</p>
            <img src={MUX} alt="image" className="w-full h-auto object-cover" />
            <p className="text-sm mt-2 underline text-indigo-700">
              DEV's Worldwide Show and Tell Challenge Presented by Mux: Pitch
              Your Projects! $3,000 in Prizes 🧠
            </p>
            <p className="text-sm text-gray-500 mt-2 italic">
              Our version of "Shark Tank" but without the sharks.
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-semibold">
            Have a great week 💗
          </p>
        </div>
      </aside>

      {/* Layer 3 */}
      <aside className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 text-xl">
            #discuss
          </h3>
          <p className="text-gray-500 text-xs">
            Discussion threads targeting the whole community
          </p>
        </div>

        {/* Item */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">What was your win this week???</p>
          <p className="text-sm text-gray-500 mt-1">10 comments</p>
        </div>

        {/* Item */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">
            How to become an AWS community builder.
          </p>
          <p className="text-sm text-gray-500 mt-1">7 comments</p>
        </div>

        {/* Repeatable items */}
        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">
            Are we losing our manners in software development?
          </p>
          <p className="text-sm text-gray-500 mt-1">20 comments</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">How to implement the Picture-in-Picture (PiP) on iOS in React Native(Outside app like WhatsApp).</p>
          <p className="text-sm text-gray-900 bg-yellow-400 p-1 text-center rounded-lg w-12 mt-1">New</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-200  text-gray-600 hover:text-indigo-800 cursor-pointer transition ">
          <p className="text-md">I built a Cyber-Security language in GO.</p>
          <p className="text-sm text-gray-900 bg-yellow-400 text-center p-1 rounded-lg w-12 mt-1">New</p>
        </div>
      </aside>
    </div>
  );
}
