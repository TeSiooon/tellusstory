import Link from "next/link";
import { useState, useEffect } from "react";

import ShowReports from "./ShowReports";
import DeleteReportsButton from "./DeleteReportsButton";
import DeleteStoryButton from "./DeleteStoryButton";

import classes from "./ReportedList.module.css";

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
            className={`p-3 text-gray-950 bg-white flex ${
              reportsCount[storyId] >= 6 ? classes.important : classes.mid
            }`}
          >
            <div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportedList;
