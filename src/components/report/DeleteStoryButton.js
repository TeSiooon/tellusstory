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
      <button type="button" onClick={deleteStoryHandler}>
        Usun
      </button>
    </>
  );
};

export default DeleteStoryButton;
