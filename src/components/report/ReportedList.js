import Link from "next/link";
import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";

const ReportedList = ({ reports }) => {
  const [reportsCount, setReportsCount] = useState({});

  useEffect(() => {
    const countMap = {};
    reports.forEach((report) => {
      countMap[report.storyId] = (countMap[report.storyId] || 0) + 1;
    });

    setReportsCount(countMap);
  }, [reports]);

  return (
    <div className="w-full mx-10">
      <h2 className="font-semibold mb-4">Lista zgłoszeń</h2>
      <ul className="">
        {Object.keys(reportsCount).map((storyId) => (
          <li
            key={storyId}
            className={`py-2 ${
              reportsCount[storyId] <= 2
                ? "text-gray-500"
                : reportsCount[storyId] <= 5
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            <Link href={`/${storyId}`} target="_blank">
              Pokaz historie &#8599;
            </Link>
            <span className="ml-2 text-sm">
              ({reportsCount[storyId]} zgłoszeń)
            </span>
            <DeleteButton storyId={storyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportedList;
