import { redirect, useRouter } from "next/navigation";

const DeleteReportsButton = ({ storyId }) => {
  const router = useRouter();
  const deleteReportsHandler = async () => {
    const res = await fetch(`/api/deletereports?storyId=${storyId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("usunieto zgloszenia");
      // redirect("/admin");
      router.push("admin");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={deleteReportsHandler}
        className="bg-gray-300 text-black rounded-full drop-shadow-lg px-4 py-2"
      >
        Ignoruj
      </button>
    </>
  );
};

export default DeleteReportsButton;
