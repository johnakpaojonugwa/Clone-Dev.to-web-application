import DevAppsSidebar from "@/components/DevAppsSidebar";

export default function DevLayout({ children, right }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      
      {/* EXTREME LEFT APP RAIL */}
      <DevAppsSidebar />

      {/* PAGE CONTENT */}
      <div className="flex-1 flex ml-[56px]">
        
        {/* MAIN CONTENT */}
        <main className="w-full max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block w-[320px] pr-6 py-6">
          {right}
        </aside>

      </div>
    </div>
  );
}
