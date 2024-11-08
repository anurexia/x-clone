import { HiOutlineHeart } from "react-icons/hi2";
import Avatar from "./Avatar";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment.id}
      className="flex gap-6 border-b-2 border-neutral-100 pb-4"
    >
      <div className="h-full">
        <Avatar profile_image={comment?.profile_image} />
      </div>

      <div className="space-y-4">
        {/* author info */}
        <div className="flex items-center gap-3">
          <h2 className="text-md truncate font-semibold">{comment?.name}</h2>
          <p className="tracking truncate">@{comment?.username}</p>
        </div>
        {/* main content */}
        <p>{comment?.comment}</p>
        {/* action */}
        <HiOutlineHeart />
      </div>
    </div>
  );
};
export default Comment;
