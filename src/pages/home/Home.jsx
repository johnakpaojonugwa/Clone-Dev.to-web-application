import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import DevAppsSidebar from "@/components/DevAppsSidebar";

export default function DevHome() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <DevAppsSidebar />

      <main className="max-w-[1380px] mx-auto grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-2 hidden lg:block">
          <LeftSidebar />
        </aside>

        <section className="col-span-12 lg:col-span-7">
          <Feed />
        </section>

        <aside className="col-span-3 hidden xl:block">
          <RightSidebar />
        </aside>
      </main>
    </div>
  );
}
