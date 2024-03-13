import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CommentsList from "../comments/CommentsList";
import NewComment from "../comments/NewComment";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./StoryDetail.module.css";
import ReportButton from "../report/ReportButton";

const StoryDetail = (props) => {
  const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  const [commentsVisible, setCommentsVisible] = useState(false);

  const toggleCommentsVisibility = () => {
    setCommentsVisible((prev) => !prev);
  };
  return (
    <div className={`${classes.card} flex flex-col w-full my-8 `}>
      <div className="flex w-full px-3">
        <p className="w-1/2 ">{props.authorName}</p>
        <Link href={`/${props.id}`} className="w-1/2 text-right">
          #{displayedId}
        </Link>
      </div>
      <div className={`${classes.card_text} flex w-full`}>
        <p className="p-3 w-full">{props.storyText}</p>
      </div>

      <div className="w-full px-2">
        <NewComment storyId={props.id} />

        <div className="flex">
          <div className="flex w-1/2 ">
            <p>Comments ({props.comments.length})</p>
            <motion.button
              animate={{ rotate: commentsVisible ? 180 : 0 }}
              onClick={toggleCommentsVisibility}
            >
              &#9650;
            </motion.button>
          </div>
          <div className="w-1/2 text-right">
            <ReportButton storyId={props.id} />
          </div>
        </div>

        <AnimatePresence>
          {commentsVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CommentsList comments={props.comments} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryDetail;
