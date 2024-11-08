import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import Avatar from "./Avatar";

const MiniProfile = ({ user }) => {
  return (
    <div className="flex w-full cursor-pointer items-center gap-2 rounded-full p-2 transition-all hover:bg-neutral-100 sm:mt-auto">
      <Image
        src={user?.image || "/default profile.webp"}
        className="min-h-12 min-w-12 cursor-pointer self-start rounded-full bg-neutral-500 hover:brightness-95 sm:h-12 sm:w-12"
        alt="user avatar"
        height={100}
        width={100}
      />
      <div className="hidden xl:block">
        <h3 className="text-md font-semibold text-neutral-700">{user?.name}</h3>
        <p className="text-sm text-neutral-600">@{user?.username}</p>
      </div>
      <IoIosMore className="ml-auto hidden xl:block" />
    </div>
  );
};

export default MiniProfile;
