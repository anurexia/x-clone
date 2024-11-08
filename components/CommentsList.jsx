import { supabase } from "@/services/supabase";
import Comment from "./Comment";

const fetchComments = async (postId) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return comments;
};

const CommentsList = async ({ postId }) => {
  const comments = await fetchComments(postId);

  return (
    <div className="ml-8 space-y-6">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
export default CommentsList;
