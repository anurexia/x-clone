import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

export const useCheckLikes = (userId, postId) => {
  const [hasLiked, setHasLiked] = useState(false);

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

  return { hasLiked, setHasLiked };
};
