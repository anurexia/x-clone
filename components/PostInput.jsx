"use client";

import { MAX_CHARS } from "@/lib/constants";
import Image from "next/image";
import { HiMiniXCircle } from "react-icons/hi2";

const PostInput = ({ onChangeText, text, imageUrl, onRemoveImage }) => {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={onChangeText}
        className="text-md h-24 resize-none pt-4 outline-none placeholder:text-lg placeholder:tracking-wide placeholder:text-neutral-600"
        name=""
        id=""
        placeholder="What's happening?"
        spellCheck={false}
        minLength={0}
        maxLength={MAX_CHARS}
      />

      {imageUrl && (
        <div className="relative">
          <Image
            src={imageUrl}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-cover brightness-90"
          />

          <HiMiniXCircle
            className="absolute right-3 top-3 h-7 w-7 cursor-pointer rounded-full text-neutral-100 transition-all duration-300 hover:text-neutral-300"
            onClick={onRemoveImage}
          />
        </div>
      )}

      <small className="pr-2 text-right font-semibold">
        {text.length} / {MAX_CHARS}
      </small>
    </div>
  );
};
export default PostInput;
