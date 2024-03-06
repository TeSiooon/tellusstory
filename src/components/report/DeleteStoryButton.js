import { useState } from "react";
import ReportModal from "./ReportModal";

const DeleteStoryButton = ({ storyId }) => {
  const deleteStoryHandler = () => {
    console.log(storyId);
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
