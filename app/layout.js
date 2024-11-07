import Sidebar from "@/components/Sidebar";
import "./globals.css";
import NewsList from "@/components/NewsList";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";

export const metadata = {
  title: {
    default: "Home",
    template: "%s | x-clone",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, quo!",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en" className="scroll-smooth">
        <body>
          <div className="mx-auto flex h-auto max-w-7xl justify-between">
            <section className="h-auto transition-all lg:min-w-56">
              <Sidebar />
            </section>

            <section className="h-full w-full">{children}</section>

            <section className="hidden w-[25rem] max-w-96 border-l-2 border-l-neutral-100 p-4 sm:block md:w-[45rem]">
              <input
                className="sticky top-0 mb-8 w-full rounded-full bg-neutral-100 px-4 py-2 text-sm outline-blue-500 focus:bg-neutral-50"
                type="text"
                name=""
                placeholder="Search"
              />

              <NewsList />
            </section>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
