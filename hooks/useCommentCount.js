import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

export const useCommentCount = (postId) => {
  const [comments, setComments] = useState([]);
  const commentCount = comments.length;

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { data: comments, error } = await supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) throw error;

      setComments(comments);
    };

    fetchCommentCount();

    const channels = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload) => {
          try {
            if (payload.eventType === "INSERT") {
              setComments((previousComments) => [
                payload.new,
                ...previousComments,
              ]);
            }
          } catch (error) {
            console.error("Error handling postgres change event: ", error);
          }
        },
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [postId]);

  return commentCount;
};
