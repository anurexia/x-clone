import Feed from "@/components/Feed";
import PostForm from "@/components/PostForm";

function Home() {
  return (
    <main>
      <h1 className="sticky top-0 z-0 mb-2 rounded-b-lg bg-neutral-50 p-4 text-xl font-bold text-neutral-600 sm:text-2xl">
        Home
      </h1>
      <PostForm />
      <Feed />
    </main>
  );
}

export default Home;
