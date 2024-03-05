import { useState } from "react";
import ReportModal from "./ReportModal";

const ReportButton = ({ storyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reportHandler = () => {
    openModal();
  };
  return (
    <>
      <button type="button" onClick={reportHandler}>
        Zglos
      </button>
      <ReportModal
        isOpen={isModalOpen}
        onClose={closeModal}
        storyId={storyId}
      />
    </>
  );
};

export default ReportButton;
