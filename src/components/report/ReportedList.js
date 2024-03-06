import Link from "next/link";
import { useState, useEffect } from "react";

import ShowReports from "./ShowReports";
import DeleteReportsButton from "./DeleteReportsButton";
import DeleteStoryButton from "./DeleteStoryButton";

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
      <h2 className="font-semibold p-4 mt-10 bg-emerald-900">Lista zgłoszeń</h2>
      <ul>
        {Object.keys(reportsCount).map((storyId) => (
          <li
            key={storyId}
            className={`p-3 bg-emerald-200 ${
              reportsCount[storyId] <= 2
                ? "text-gray-500"
                : reportsCount[storyId] <= 5
                ? "text-red-500"
                : "text-red-800"
            }`}
          >
            <Link href={`/${storyId}`} target="_blank">
              Pokaz historie &#8599;
            </Link>
            <span className="ml-2 text-sm">
              ({reportsCount[storyId]} zgłoszeń)
            </span>
            {/* Actions */}

            <ShowReports
              reports={reports.filter((report) => report.storyId === storyId)}
            />

            <div className="flex gap-5">
              <DeleteReportsButton storyId={storyId} />
              <DeleteStoryButton storyId={storyId} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportedList;
