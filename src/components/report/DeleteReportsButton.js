import { useState } from "react";
import ReportModal from "./ReportModal";

const DeleteReportsButton = ({ storyId }) => {
  const deleteReportsHandler = () => {
    console.log(storyId);
  };
  return (
    <>
      <button type="button" onClick={deleteReportsHandler}>
        Usun
      </button>
    </>
  );
};

export default DeleteReportsButton;
