"use client";
import { useModal } from "@/context/ModalContext";
import { useCheckLikes } from "@/hooks/useCheckLikes";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useFetchLikeCounts } from "@/hooks/useFetchLikeCounts";
import { supabase } from "@/services/supabase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi2";

const PostActions = ({ postId, uid }) => {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const userId = session?.user?.userId;
  const { setOpen, setPostId } = useModal();
  const { hasLiked, setHasLiked } = useCheckLikes(userId, postId);
  const commentCount = useCommentCount(postId);
  const likesCount = useFetchLikeCounts(postId);

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
      <div className="flex items-center gap-2">
        <HiOutlineChatBubbleOvalLeftEllipsis
          onClick={() => {
            // - make sure the user is signed in
            if (!session) {
              signIn("google");
            } else {
              setOpen((open) => !open);
              setPostId(postId);
            }
          }}
          className={iconClass}
        />
        {commentCount > 0 && <p className="font-semibold">{commentCount}</p>}
      </div>

      <div className="flex items-center gap-2">
        {hasLiked ? (
          <HiHeart onClick={handleLikePost} className={iconClass} />
        ) : (
          <HiOutlineHeart onClick={handleLikePost} className={iconClass} />
        )}
        <span className="text-sm font-semibold text-neutral-600">
          {likesCount}
        </span>
      </div>

      {uid === userId && (
        <HiOutlineTrash onClick={handleDeletePost} className={iconClass} />
      )}
    </div>
  );
};
export default PostActions;
