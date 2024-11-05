// import { useSession } from "next-auth/react";
import Image from "next/image";

const Avatar = ({ profile_image }) => {
  // const { data: session } = useSession();

  return (
    <Image
      src={profile_image || "/default profile.webp"}
      className="h-10 w-10 self-start rounded-full bg-neutral-500 sm:h-12 sm:w-12"
      alt="user avatar"
      height={100}
      width={100}
    />
  );
};
export default Avatar;
