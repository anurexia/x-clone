"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

const Sidebar = () => {
  // - access the current session
  const { data: session } = useSession();

  return (
    <nav className="hidden p-6 sm:block">
      <Link href={"/"}>
        <FaXTwitter className="h-12 w-12 rounded-full p-2 transition-all hover:bg-neutral-100" />
      </Link>

      <div className="space-y-6">
        <div className="mt-12 flex cursor-pointer items-center gap-4 rounded-full p-3 transition-all hover:bg-neutral-100">
          <HiHome className="h-6 w-6 text-neutral-700" />
          <span className="tracking hidden text-neutral-700 transition-all xl:block">
            Home
          </span>
        </div>

        {session ? (
          <button
            onClick={() => signOut()}
            className="hidden w-full rounded-full bg-blue-500 p-2 text-blue-50 shadow-md transition-all hover:bg-blue-600 xl:block"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="hidden w-full rounded-full bg-blue-500 p-2 text-blue-50 shadow-md transition-all hover:bg-blue-600 xl:block"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};
export default Sidebar;
