import { useSession } from "next-auth/react";
import Link from "next/link";

const Story = (props) => {
  // console.log(props);
  //   const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-center items-center w-full bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
      </div>
      <div className="bg-red-200">
        <p>{props.storyText}</p>
      </div>

      <p>
        Comments
        {/* {status === "authenticated" && (
          <li>
            <button>Add comment</button>
          </li>
        )} */}
        {/* Komentarze */}
      </p>
    </div>
  );
};

export default Story;
