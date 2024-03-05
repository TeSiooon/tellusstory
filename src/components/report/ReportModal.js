import ReactModal from "react-modal";
import classes from "./ReportModal.module.css";
import { useRef } from "react";

const ReportModal = ({ isOpen, onClose, storyId }) => {
  const reportRef = useRef();
  const handleCloseAndSendHadler = () => {
    console.log("wyslano");
    console.log(storyId);
    console.log(reportRef.current.value);
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
      <div>
        <h2>Wpisz tresc zgloszenia</h2>
        <input
          className="w-full"
          type="text"
          required
          ref={reportRef}
          name="reportText"
        ></input>
      </div>
      <button onClick={handleCloseAndSendHadler}>Zglos</button>
    </ReactModal>
  );
};

export default ReportModal;
