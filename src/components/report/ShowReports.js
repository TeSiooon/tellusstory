import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ShowReportsButton = ({ reports }) => {
  const [showReports, setShowReports] = useState(false);

  const toggleShowReports = () => {
    setShowReports(!showReports);
  };

  return (
    <div className="my-2">
      <p>
        {showReports ? "Ukryj zgłoszenia" : "Pokaż zgłoszenia"}{" "}
        <motion.button
          animate={{ rotate: showReports ? 180 : 0 }}
          onClick={toggleShowReports}
        >
          &#9650;
        </motion.button>
      </p>
      <AnimatePresence>
        {showReports && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <h3>Zgłoszenia:</h3>
            <ul>
              {reports.map((report) => (
                <li key={report._id}>&quot;{report.reportText}&quot;</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowReportsButton;
