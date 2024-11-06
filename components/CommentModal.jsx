"use client";

import { useModal } from "@/context/ModalContext";

const CommentModal = () => {
  const { open, setOpen } = useModal();

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-yellow-500">
      <div className="h-full w-full bg-blue-500 p-8 sm:rounded-2xl">
        <h1>Comment</h1>
        {open && <h1>Pogi ako</h1>}
        <button onClick={() => setOpen((open) => !open)}>Click to open</button>
      </div>
    </div>
  );
};

export default CommentModal;
