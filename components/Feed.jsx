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
          setPosts((currentPosts) => [payload.new, ...currentPosts]);
        },
      )
      .subscribe();

    // - cleanup
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  console.log(posts);

  return (
    <section className="w-full">
      {posts && posts?.map((post) => <Post key={post.id} post={post} />)}
    </section>
  );
};

export default Feed;
