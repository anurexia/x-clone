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

const PostActions = ({ postId, likeCounts, uid }) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);

  const username = session?.user?.username;
  const userId = session?.user?.userId;

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

  const handleDeletePost = async () => {
    if (confirm("Do you want to delete this post?")) {
      if (userId === uid) {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId);
        if (error) throw error;
      }
    }

    return;
  };

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

      {uid === userId && (
        <HiOutlineTrash onClick={handleDeletePost} className={iconClass} />
      )}
    </div>
  );
};
export default PostActions;
