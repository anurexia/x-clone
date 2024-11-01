import Sidebar from "@/components/Sidebar";
import "./globals.css";
import News from "@/components/News";

export const metadata = {
  title: {
    default: "x-clone",
    template: "%s | x-clone",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, quo!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex h-screen max-w-6xl justify-between">
          <section className="h-screen border-r border-r-neutral-100 transition-all lg:min-w-60">
            <Sidebar />
          </section>

          <section className="w-full">{children}</section>

          <section className="hidden min-w-96 bg-red-500 sm:block">
            <News />
          </section>
        </div>
      </body>
    </html>
  );
}
