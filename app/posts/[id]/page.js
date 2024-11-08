import Avatar from "@/components/Avatar";
import Comment from "@/components/Comment";
import CommentsList from "@/components/CommentsList";
import PostActions from "@/components/PostActions";
import { supabase } from "@/services/supabase";
import Image from "next/image";
import Link from "next/link";
import { HiArrowSmallLeft, HiOutlineHeart } from "react-icons/hi2";

const fetchPost = async (postId) => {
  const { data: fetchedPost, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId);

  if (error) throw error;

  return fetchedPost[0];
};

const PostPage = async ({ params }) => {
  const post = await fetchPost(params.id);

  return (
    <div className="flex flex-col gap-10 p-4">
      <Link
        href={"/"}
        className="flex items-center gap-2 border-b-2 border-neutral-50 pb-4 text-lg font-bold text-neutral-600 sm:text-2xl"
      >
        <HiArrowSmallLeft /> <span>Back</span>
      </Link>

      <div className="flex h-auto gap-6 border-b-2 border-neutral-100 pb-4">
        <div className="flex h-full w-24 justify-center pt-4">
          <Avatar profile_image={post?.profile_image} />
        </div>

        <div className="space-y-4">
          {/* author info */}
          <div className="flex items-center gap-3">
            <h2 className="text-md truncate font-semibold">{post?.name}</h2>
            <p className="tracking truncate">@{post?.username}</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* main content */}
            <p>{post?.text}</p>
            {post?.image_url && (
              <Image
                src={post?.image_url}
                alt="post image"
                height={1000}
                width={1000}
                className="h-1/2 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          {/* post actions */}
          <PostActions postId={params.id} />
        </div>
      </div>

      <CommentsList postId={params.id} />
    </div>
  );
};
export default PostPage;
