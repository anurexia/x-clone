import { supabase } from "@/services/supabase";

const fetchComments = async (postId) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId);

  if (error) throw error;

  return comments;
};

const PostPage = async ({ params }) => {
  const comments = await fetchComments(params.id);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center gap-4">
          <h3>@{comment.username}</h3>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};
export default PostPage;
