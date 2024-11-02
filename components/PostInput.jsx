"use client";

const PostInput = ({ onChangeText, text }) => {
  return (
    <textarea
      value={text}
      onChange={onChangeText}
      className="text-md h-3/4 resize-none border-b-2 border-b-neutral-100 p-3 outline-none placeholder:text-lg placeholder:tracking-wide placeholder:text-neutral-600"
      name=""
      id=""
      placeholder="What's happening?"
      spellCheck={false}
    />
  );
};
export default PostInput;
