import { useState } from "react";
import ReportModal from "./ReportModal";
import { useRouter } from "next/navigation";

const DeleteStoryButton = ({ storyId }) => {
  const router = useRouter();
  const deleteStoryHandler = async () => {
    const res = await fetch(`/api/deletestory?storyId=${storyId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("usunieto historie i jej zgloszenia");
      router.push("admin");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={deleteStoryHandler}
        className="bg-red-700 text-white rounded-full drop-shadow-lg px-4 py-2"
      >
        Usun
      </button>
    </>
  );
};

export default DeleteStoryButton;
