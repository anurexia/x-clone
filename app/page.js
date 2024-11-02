import PostForm from "@/components/PostForm";

function Home() {
  return (
    <main className="sticky top-0">
      <h1 className="mb-2 p-4 text-xl font-bold text-neutral-600 sm:text-2xl">
        Home
      </h1>
      <PostForm />
    </main>
  );
}

export default Home;
