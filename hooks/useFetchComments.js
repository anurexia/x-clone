import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      const { data: fetchedComments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  return comments;
};
