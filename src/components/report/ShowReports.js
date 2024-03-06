import { useState } from "react";

const ShowReportsButton = ({ reports }) => {
  const [showReports, setShowReports] = useState(false);

  const toggleShowReports = () => {
    setShowReports(!showReports);
  };

  return (
    <div>
      <button onClick={toggleShowReports}>
        {showReports ? "Ukryj zgłoszenia" : "Pokaż zgłoszenia"}
      </button>
      {showReports && (
        <div>
          <h3>Zgłoszenia:</h3>
          <ul>
            {reports.map((report) => (
              <li key={report._id}>{report.reportText}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowReportsButton;
