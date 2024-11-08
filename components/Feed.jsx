//! Client side data fetching
"use client";
import Post from "./Post";
import useFetchPosts from "@/hooks/useFetchPosts";

const Feed = () => {
  const posts = useFetchPosts();

  return (
    <section className="w-full">
      {posts && posts?.map((post) => <Post key={post.id} post={post} />)}
    </section>
  );
};

export default Feed;
