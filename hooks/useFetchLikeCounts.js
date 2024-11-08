import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

export const useFetchLikeCounts = (postId) => {
  const [likes, setLikes] = useState([]);
  const likesCount = likes.length;

  useEffect(() => {
    const fetchLikesCount = async () => {
      const { data: fetchedLikes, error } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) throw error;

      setLikes(fetchedLikes);
    };

    fetchLikesCount();

    const channels = supabase
      .channel("likes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "likes" },
        (payload) => {
          try {
            if (payload.eventType === "INSERT") {
              setLikes((previousPostLikes) => [
                payload.new,
                ...previousPostLikes,
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

  return likesCount;
};
