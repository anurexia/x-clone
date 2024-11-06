import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";

const useLikeCounts = (postId) => {
  const [likeCounts, setLikeCounts] = useState(0);

  useEffect(() => {
    // Function to fetch the initial count
    const fetchLikeCounts = async () => {
      const { count, error } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (!error) {
        setLikeCounts(count);
      }
    };

    fetchLikeCounts();

    // Subscribe to real-time changes in the likes table
    const subscription = supabase
      .channel("likes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all changes (INSERT, DELETE, etc.)
          schema: "public",
          table: "likes",
          filter: `post_id=eq.${postId}`, // Only for this post
        },
        (payload) => {
          // Adjust count based on the type of event
          if (payload.eventType === "INSERT") {
            setLikeCounts((prev) => prev + 1);
          } else if (payload.eventType === "DELETE") {
            setLikeCounts((prev) => Math.max(prev - 1, 0));
          }
        },
      )
      .subscribe();

    // Cleanup the subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [postId]);

  return likeCounts;
};

export default useLikeCounts;
