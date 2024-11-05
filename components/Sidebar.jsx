"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import MiniProfile from "./MiniProfile";

const Sidebar = () => {
  // - access the current session
  const { data: session } = useSession();

  return (
    <nav className="fixed hidden h-full p-6 sm:flex sm:flex-col">
      <Link href={"/"}>
        <FaXTwitter className="h-12 w-12 rounded-full p-2 transition-all hover:bg-neutral-100" />
      </Link>

      <div className="space-y-6">
        <div className="mt-12 flex cursor-pointer items-center gap-4 rounded-full p-3 transition-all hover:bg-neutral-100">
          <HiHome className="h-6 w-6 text-neutral-700" />
          <span className="tracking hidden text-neutral-700 transition-all lg:block">
            Home
          </span>
        </div>

        {session ? (
          <button
            onClick={() => signOut()}
            className="text-md hidden w-full rounded-full bg-blue-500 p-2 font-semibold text-blue-50 shadow-md transition-all hover:bg-blue-600 lg:block"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="text-md hidden w-full rounded-full bg-blue-500 p-2 font-semibold text-blue-50 shadow-md transition-all hover:bg-blue-600 lg:block"
          >
            Sign In
          </button>
        )}
      </div>

      {session && <MiniProfile user={session?.user} />}
    </nav>
  );
};
export default Sidebar;
