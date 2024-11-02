import { useSession } from "next-auth/react";
import Image from "next/image";

const Avatar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-full w-1/6 items-center justify-center py-2">
      <Image
        src={session?.user?.image || "/default profile.webp"}
        className="h-10 w-10 self-start rounded-full bg-neutral-500 sm:h-12 sm:w-12"
        alt="user avatar"
        height={100}
        width={100}
      />
    </div>
  );
};
export default Avatar;
