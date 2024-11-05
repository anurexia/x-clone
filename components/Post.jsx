import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Avatar from "./Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";

const Post = ({
  post: { created_at, image_url, profile_image, text, uid, username, name, id },
}) => {
  const formattedDate = formatDate(created_at);

  return (
    <div className="flex flex-col gap-4 p-4 transition-all duration-300 hover:rounded-2xl hover:bg-neutral-100">
      <div className="flex w-full items-center gap-4">
        <Avatar profile_image={profile_image} />

        <div className="flex items-end gap-1">
          <h2 className="truncate text-sm font-semibold">{name}</h2>
          <p className="truncate">@{username}</p>
          <p className="ml-1 text-sm text-neutral-500">{formattedDate}</p>
        </div>
        <HiOutlineDotsHorizontal className="ml-auto" />
      </div>

      <Link href={`/posts/${id}`}>
        <p className="line-clamp-4">{text}</p>
      </Link>

      <Link href={`/posts/${id}`}>
        {image_url && (
          <Image
            src={image_url}
            alt="post image"
            height={1000}
            width={1000}
            className="h-full w-full rounded-2xl object-cover"
          />
        )}
      </Link>
    </div>
  );
};
export default Post;
