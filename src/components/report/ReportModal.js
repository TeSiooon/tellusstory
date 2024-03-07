import ReactModal from "react-modal";
import classes from "./ReportModal.module.css";
import { useRef } from "react";
import { motion } from "framer-motion";

const ReportModal = ({ isOpen, onClose, storyId }) => {
  const reportRef = useRef();
  const handleCloseAndSendHadler = async () => {
    // console.log("wyslano");
    // console.log(storyId);
    // console.log(reportRef.current.value);
    const reportText = reportRef.current.value;
    if (reportText.trim() !== "") {
      const reportData = {
        storyId,
        reportText,
      };
      const response = await fetch("/api/report", {
        method: "POST",
        body: JSON.stringify(reportData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        onClose();
      } else {
        console.log("wrong");
      }
    }
    console.log("brak");
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Report"
      className={classes.Modal}
      overlayClassName={classes.Overlay}
      ariaHideApp={false}
    >
      <div className="m-7">
        <h2 className="font-bold my-2">Wpisz tresc zgloszenia</h2>
        <textarea
          className="w-full max-h-40 min-h-10 resize-y overflow-auto border border-gray-300 rounded-md p-2 my-5"
          type="text"
          required
          ref={reportRef}
          name="reportText"
        ></textarea>
        <motion.button
          className="bg-white w-1/6 text-black rounded-full drop-shadow-lg px-4 py-2 transition duration-300 ease-in-out transform hover:bg-red-600 hover:shadow-lg"
          onClick={handleCloseAndSendHadler}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Zglos
        </motion.button>
      </div>
    </ReactModal>
  );
};

export default ReportModal;
