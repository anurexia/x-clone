"use client";

import {
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi2";

const PostActions = () => {
  const iconClass =
    "h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 ease-in-out";

  return (
    <div className="flex items-center gap-4">
      <HiOutlineChatBubbleOvalLeftEllipsis className={iconClass} />
      <HiOutlineHeart className={iconClass} />
      <HiOutlineTrash className={iconClass} />
    </div>
  );
};
export default PostActions;
