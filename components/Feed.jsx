//! Client side data fetching
"use client";
import { supabase } from "@/services/supabase";

import { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error("Something wen't wrong");
      setPosts(posts);
    };

    fetchInitialPosts();

    // - realtime listener
    const subscription = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          try {
            if (payload.eventType === "INSERT") {
              setPosts((previousPosts) => [payload.new, ...previousPosts]);
            } else if (payload.eventType === "DELETE") {
              setPosts((previousPosts) =>
                previousPosts.filter((post) => post.id !== payload.old.id),
              );
            }
          } catch (error) {
            console.error("Error handling postgres change event: ", error);
          }
        },
      )
      .subscribe();

    // - cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <section className="w-full">
      {posts && posts?.map((post) => <Post key={post.id} post={post} />)}
    </section>
  );
};

export default Feed;
