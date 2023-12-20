import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CommentsList from "../comments/CommentsList";
import NewComment from "../comments/NewComment";
import { AnimatePresence, motion } from "framer-motion";

const StoryDetail = (props) => {
  const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  const [commentsVisible, setCommentsVisible] = useState(false);
  // console.log(props);

  const toggleCommentsVisibility = () => {
    setCommentsVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
        <Link href={`/${props.id}`} className="w-1/2 text-right">
          #{displayedId}
        </Link>
      </div>
      <div className="bg-red-200">
        <p>{props.storyText}</p>
      </div>

      <div className="w-full">
        Comments ({props.comments.length})
        <motion.button
          animate={{ rotate: commentsVisible ? 180 : 0 }}
          onClick={toggleCommentsVisibility}
        >
          &#9650;
        </motion.button>
        <AnimatePresence>
          {commentsVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CommentsList comments={props.comments} />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NewComment storyId={props.id} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryDetail;
