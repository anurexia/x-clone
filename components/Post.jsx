import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Avatar from "./Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import PostActions from "./PostActions";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

const Post = ({
  post: {
    created_at,
    image_url,
    profile_image,
    text,
    uid,
    username,
    name,
    id: postId,
  },
}) => {
  const formattedDate = formatDate(created_at);
  const [likeCounts, setLikeCounts] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error, count } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) {
        console.error("Error fetching like counts: ", error);
        return;
      }

      setLikeCounts(count || data.length);
    };

    fetchLikes();

    const channels = supabase
      .channel("likes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
          // filter: "post_id=eq.${postId}",
        },
        (payload) => {
          console.log(payload);
          if (payload.eventType === "INSERT") {
            setLikeCounts((previousCount) => previousCount + 1);
          } else if (payload.eventType === "DELETE") {
            setLikeCounts((previousCount) => Math.max(previousCount - 1, 0));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [postId]);

  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-b p-4 hover:rounded-2xl">
      <div className="flex w-full items-center gap-4">
        <Avatar profile_image={profile_image} />

        <div className="flex items-end gap-1">
          <h2 className="text-md truncate font-semibold">{name}</h2>
          <p className="tracking truncate">@{username}</p>
          <p className="ml-1 text-sm text-neutral-500">{formattedDate}</p>
        </div>
        <HiOutlineDotsHorizontal className="ml-auto" />
      </div>

      <Link href={`/posts/${postId}`}>
        <p className="line-clamp-4">{text}</p>
      </Link>

      <Link href={`/posts/${postId}`}>
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

      <PostActions postId={postId} likeCounts={likeCounts} />
    </div>
  );
};
export default Post;
