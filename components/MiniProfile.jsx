import Image from "next/image";
import { IoIosMore } from "react-icons/io";

const MiniProfile = ({ user }) => {
  return (
    <div className="flex w-full cursor-pointer items-center gap-2 rounded-full p-2 transition-all hover:bg-neutral-100 sm:mt-auto">
      <div className="h-12 w-12">
        <Image
          src={user?.image || "/default profile.webp"}
          className="h-11 w-11 rounded-full object-cover"
          height={36}
          width={36}
          alt="mini profile"
        />
      </div>
      <div className="hidden xl:block">
        <h3 className="text-md font-semibold text-neutral-700">{user?.name}</h3>
        <p className="text-sm text-neutral-600">@{user?.username}</p>
      </div>
      <IoIosMore className="ml-auto hidden xl:block" />
    </div>
  );
};

export default MiniProfile;
