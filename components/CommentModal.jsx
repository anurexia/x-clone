"use client";

import { useModal } from "@/context/ModalContext";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import Modal from "react-modal";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { useFetchComments } from "@/hooks/useFetchComments";

const CommentModal = () => {
  const { open, postId, setOpen } = useModal();
  const [currentPost, setCurrentPost] = useState({});
  const [text, setText] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleComment = async () => {
    if (!text.length) return;

    try {
      const { error: commentError } = await supabase.from("comments").insert({
        name: session.user.name,
        post_id: postId,
        comment: text,
        uid: session.user.userId,
        username: session.user.username,
      });

      if (commentError) throw commentError;
    } catch (error) {
      console.error(error);
    }

    setOpen(!open);
    setText("");
    router.push(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchCurrentPost = async () => {
      if (!postId || postId === "") {
        console.error("Invalid post id provided");
        return;
      }

      try {
        // get the post
        let { data: post, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setCurrentPost(post);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (postId && postId !== "") {
      fetchCurrentPost();
    }
  }, [postId]);

  return (
    <div>
      {open && (
        <Modal
          className="absolute left-[50%] top-24 z-10 w-[90%] max-w-lg translate-x-[-50%] rounded-2xl bg-white shadow-xl outline-none transition-all duration-300 md:max-w-3xl"
          isOpen={open}
          onRequestClose={() => setOpen(!open)}
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          shouldReturnFocusAfterClose
        >
          <div className="space-y-6 p-4">
            <div className="flex justify-end border-b-2 border-neutral-100 p-4">
              <HiX
                onClick={() => setOpen(!open)}
                className="h-10 w-10 cursor-pointer rounded-full p-2 text-2xl transition-all duration-300 hover:rotate-90 hover:bg-neutral-200"
              />
            </div>

            {/* user */}
            <div className="flex flex-col gap-6 p-3">
              <div className="flex gap-3">
                <div className="relative">
                  <span className="absolute left-1/2 top-1/2 z-[-1] h-24 w-1 translate-x-[-50%] bg-neutral-200"></span>
                  <Avatar profile_image={currentPost?.profile_image} />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-1 items-center gap-2">
                    <p className="truncate font-semibold text-neutral-600">
                      {currentPost.name}
                    </p>
                    <p className="text-md tracking truncate font-medium text-neutral-500">
                      @{currentPost.username}
                    </p>
                  </div>

                  {/* main content */}
                  <div className="space-y-1">
                    <p className="text-md font-normal">{currentPost?.text}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="self-start">
                  <Avatar profile_image={session.user.image} />
                </div>

                <textarea
                  value={text}
                  onChange={(evt) => setText(evt.target.value)}
                  className="outline-non2 h-full min-h-40 flex-1 resize-none rounded-lg border bg-neutral-50 p-3 outline-none placeholder:font-semibold"
                  spellCheck={false}
                  name=""
                  id=""
                  placeholder="Reply to @ayuu"
                ></textarea>
              </div>

              <div className="flex w-full justify-end">
                <button
                  onClick={handleComment}
                  disabled={!text.length || text.trim() === ""}
                  className="tracking cursor-pointer rounded-full bg-blue-500 px-8 py-2 text-sm font-semibold uppercase text-neutral-100 shadow-md transition-all duration-300 hover:brightness-95 disabled:cursor-not-allowed lg:px-10 lg:py-3"
                >
                  reply
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
