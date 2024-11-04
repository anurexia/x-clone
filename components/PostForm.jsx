"use client";

import { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import PostInput from "./PostInput";
import { useSession } from "next-auth/react";
import { supabase } from "@/services/supabase";
import { v7 as uuidv7 } from "uuid";
import { MAX_CHARS } from "@/lib/constants";
import { FaSpinner } from "react-icons/fa6";

const PostForm = () => {
  const [text, setText] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imagePickerRef = useRef(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const { data: session } = useSession();

  const handleChangeText = (evt) => {
    setText(evt.target.value);
  };

  const handleImageUpload = (evt) => {
    const file = evt.target.files[0];

    if (file.size > 5 * 1024 * 1024) return;

    if (file.type.split("/")[0] !== "image") {
      alert("invalid file type");
      return;
    }

    if (file) {
      setCurrentImage(file);
      // - convert the file into a local image, and set it as a url for the Image component
      setImageUrl(URL.createObjectURL(file));

      evt.target.value = "";
    }
  };

  const handlePost = async () => {
    const userId = session.user.userId;
    setIsImageUploading(true);

    try {
      await supabase.storage
        .from("images")
        .upload(`${userId}/${uuidv7()}${currentImage.name}`, currentImage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageUploading(false);
      setText("");
      setCurrentImage(null);
      setImageUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
    setImageUrl(null);
  };

  return (
    <div className="flex h-auto border-y-2 border-y-neutral-100">
      {session && (
        <>
          <Avatar />
          <div className="flex h-full w-full flex-col">
            <PostInput
              onRemoveImage={handleRemoveImage}
              text={text}
              onChangeText={handleChangeText}
              imageUrl={imageUrl}
            />

            <div className="flex items-center justify-between p-2">
              <IoImageOutline
                onClick={() => imagePickerRef.current.click()}
                className="h-8 w-8 cursor-pointer rounded-full p-2 text-blue-500 transition-all hover:bg-neutral-200 sm:h-12 sm:w-12"
              />
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                ref={imagePickerRef}
                onChange={handleImageUpload}
                hidden
              />

              <button
                onClick={handlePost}
                disabled={
                  !text.length || text.length === MAX_CHARS || isImageUploading
                }
                className={`hover:bg-blue-600" rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-80 disabled:brightness-95 sm:px-8`}
              >
                {isImageUploading ? "Loading.." : "post"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PostForm;
