import { useState } from "react";
import ReportModal from "./ReportModal";

const DeleteButton = ({ storyId }) => {
  const deleteHandler = () => {
    console.log(storyId);
  };
  return (
    <>
      <button type="button" onClick={deleteHandler}>
        Usun
      </button>
    </>
  );
};

export default DeleteButton;
