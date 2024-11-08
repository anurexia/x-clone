"use client";

import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import Avatar from "./Avatar";
import { supabase } from "@/services/supabase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Comment = ({ comment, postId }) => {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const userId = session?.user?.userId;
  const name = session?.user?.name;
  const [hasLiked, setHasLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(0);

  const handleLikePost = async () => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      if (hasLiked) {
        const { error } = await supabase
          .from("comments_likes")
          .delete()
          .eq("uid", userId)
          .eq("comment_id", comment.id);

        if (error) throw error;
        setHasLiked(false);
      } else {
        const { error } = await supabase.from("comments_likes").insert({
          uid: userId,
          username,
          name,
          comment_id: comment.id,
        });

        if (error) throw error;

        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // - check if the current user has already liked the comment
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const { data, error } = await supabase
          .from("comments_likes")
          .select("*")
          .eq("uid", userId)
          .eq("comment_id", comment.id)
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

    if (userId) {
      checkIfLiked();
    }
  }, [userId, comment.id]);

  // - fetches likes from a comment
  useEffect(() => {
    const fetchLikesCount = async () => {
      const { count: fetchedLikes, error } = await supabase
        .from("comments_likes")
        .select("*", { count: "exact" })
        .eq("comment_id", comment.id); // Removed username filter since comment_id should be unique

      if (error) {
        console.error("Error fetching likes count: ", error);
        return;
      }

      setLikesCount(fetchedLikes); // Default to 0 if no likes found
    };

    fetchLikesCount();

    const channel = supabase
      .channel("comments_likes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments_likes" },
        (payload) => {
          try {
            // Only update if the payload is related to this specific comment_id
            if (payload.new && payload.new.comment_id === comment.id) {
              if (payload.eventType === "INSERT") {
                setLikesCount((prevCount) => ++prevCount);
              }
            } else if (payload.old && payload.old.comment_id === comment.id) {
              if (payload.eventType === "DELETE") {
                setLikesCount((prevCount) => Math.max(prevCount - 1, 0));
              }
            }
          } catch (error) {
            console.error("Error handling postgres change event: ", error);
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [comment.id]);

  const iconClass =
    "h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 ease-in-out";
  return (
    <div
      key={comment.id}
      className="flex gap-6 border-b-2 border-neutral-100 pb-4"
    >
      <div className="h-full">
        <Avatar profile_image={comment?.profile_image} />
      </div>

      <div className="space-y-4">
        {/* author info */}
        <div className="flex items-center gap-3">
          <h2 className="text-md truncate font-semibold">{comment?.name}</h2>
          <p className="tracking truncate">@{comment?.username}</p>
        </div>
        {/* main content */}
        <p>{comment?.comment}</p>
        {/* action */}
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
      </div>
    </div>
  );
};
export default Comment;
