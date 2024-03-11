import ReactModal from "react-modal";
import classes from "./ReportModal.module.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ErrorDisplay from "../error/ErrorDisplay";
import ErrorDetail from "../ErrorDetail";

const ReportModal = ({ isOpen, onClose, storyId }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const reportRef = useRef();

  const handleCloseAndSendHadler = async () => {
    setSending(true);
    const reportText = reportRef.current.value;
    if (reportText.trim() !== "") {
      setError("");
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
        setSent(true);
        setTimeout(() => {
          onClose();
          setSent(false);
        }, 3500);
        // onClose();
      } else {
        setError("Server error occurred");
        console.log("wrong");
      }
    } else {
      setError("Report must contain text");
    }
    setSending(false);
  };

  const handleChange = () => {
    setError("");
  };
  const handleClose = () => {
    setError("");
    onClose();
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
          onChange={handleChange}
        ></textarea>
        <div className="flex items-center justify-between">
          {/* Actions */}{" "}
          <motion.button
            className={`${sending && "w-1/2"} ${
              sent && "bg-green-500"
            } bg-white text-black rounded-full drop-shadow-lg px-4 py-2 transition duration-300 ease-in-out transform hover:bg-red-600 hover:shadow-lg`}
            onClick={handleCloseAndSendHadler}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={sending || sent}
          >
            {sending ? "Wysyłanie..." : sent ? "Wysłano" : "Zgłoś"}
          </motion.button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-white text-black rounded-full drop-shadow-lg px-4 py-2"
          >
            X
          </button>
        </div>
      </div>
      {error ? <ErrorDisplay errorText={error} /> : null}
    </ReactModal>
  );
};

export default ReportModal;
