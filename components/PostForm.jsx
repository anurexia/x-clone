"use client";

import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import PostInput from "./PostInput";
import { useSession } from "next-auth/react";

const PostForm = () => {
  const [text, setText] = useState("");

  const { data: session } = useSession();

  const handleChangeText = (evt) => {
    setText(evt.target.value);
  };

  return (
    <div className="flex h-44 border-y-2 border-y-neutral-100">
      {session && (
        <>
          <Avatar />
          <div className="flex h-full w-full flex-col">
            <PostInput text={text} onChangeText={handleChangeText} />

            <div className="flex items-center justify-between p-2">
              <IoImageOutline className="h-10 w-10 cursor-pointer rounded-full p-2 text-blue-500 transition-all hover:bg-neutral-200 sm:h-12 sm:w-12" />
              <button
                onClick={() => {
                  console.log(text);
                }}
                disabled={!text.length}
                className={`tracking hover:bg-blue-600" rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold uppercase text-blue-100 shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-80 sm:px-8`}
              >
                Post
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PostForm;
