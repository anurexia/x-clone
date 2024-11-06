"use client";
import { supabase } from "@/services/supabase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi2";

const PostActions = ({ postId, likeCounts }) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);

  const { userId, username } = session?.user;

  const handleLikePost = async () => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      if (hasLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("uid", userId)
          .eq("post_id", postId);
        if (error) throw error;
        setHasLiked(false);
      } else {
        const { error } = await supabase.from("likes").insert({
          uid: userId,
          username,
          post_id: postId,
        });

        if (error) throw error;
        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const { data, error } = await supabase
          .from("likes")
          .select("*")
          .eq("uid", userId)
          .eq("post_id", postId)
          .single();

        if (error && error.code !== "PGRST116") {
          // Ignores "Row not found" errors
          console.error("Error checking like status:", error);
        } else {
          setHasLiked(data !== null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    if (userId && postId) {
      checkIfLiked();
    }
  }, [userId, postId]);

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     const { data, error, count } = await supabase
  //       .from("likes")
  //       .select("*", { count: "exact" })
  //       .eq("post_id", postId);

  //     if (error) {
  //       console.error("Error fetching like counts: ", error);
  //       return;
  //     }

  //     setLikeCounts(count || data.length);
  //   };

  //   fetchLikes();

  //   const channels = supabase
  //     .channel("likes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "likes",
  //         // filter: "post_id=eq.${postId}",
  //       },
  //       (payload) => {
  //         console.log(payload);
  //         if (payload.eventType === "INSERT") {
  //           setLikeCounts((previousCount) => previousCount + 1);
  //         } else if (payload.eventType === "DELETE") {
  //           setLikeCounts((previousCount) => Math.max(previousCount - 1, 0));
  //         }
  //       },
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channels);
  //   };
  // }, [postId]);

  const iconClass =
    "h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 ease-in-out";
  return (
    <div className="flex items-center gap-6">
      <HiOutlineChatBubbleOvalLeftEllipsis className={iconClass} />

      <div className="flex items-center gap-2">
        {hasLiked ? (
          <HiHeart onClick={handleLikePost} className={iconClass} />
        ) : (
          <HiOutlineHeart onClick={handleLikePost} className={iconClass} />
        )}
        <span className="text-sm font-semibold text-neutral-600">
          {likeCounts}
        </span>
      </div>

      <HiOutlineTrash className={iconClass} />
    </div>
  );
};
export default PostActions;
