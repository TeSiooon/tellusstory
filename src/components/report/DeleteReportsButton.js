import { useState } from "react";
import ReportModal from "./ReportModal";

const DeleteReportsButton = ({ storyId }) => {
  const deleteReportsHandler = async () => {
    const res = await fetch(`/api/deletereports?storyId=${storyId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("usunieto zgloszenia");
    }
  };
  return (
    <>
      <button type="button" onClick={deleteReportsHandler}>
        Ignoruj
      </button>
    </>
  );
};

export default DeleteReportsButton;
