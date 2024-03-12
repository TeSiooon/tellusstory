import { useState } from "react";
import ReportModal from "./ReportModal";

const DeleteStoryButton = ({ storyId }) => {
  const deleteStoryHandler = async () => {
    const res = await fetch(`/api/deletestory?storyId=${storyId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("usunieto historie i jej zgloszenia");
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
