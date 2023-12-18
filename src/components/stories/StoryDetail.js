import { useSession } from "next-auth/react";
import Link from "next/link";

const StoryDetail = (props) => {
  const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-center items-center w-3/4 bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
        <Link href="/" className="w-1/2 text-right">
          #{displayedId}
        </Link>
      </div>
      <div className="bg-red-200">
        <p>{props.storyText}</p>
      </div>

      <p>
        Comments
        {status === "authenticated" && (
          <li>
            <button>Add comment</button>
          </li>
        )}
        {/* Komentarze */}
      </p>
    </div>
  );
};

export default StoryDetail;
