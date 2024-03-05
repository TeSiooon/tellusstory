import { useSession } from "next-auth/react";

const index = (props) => {
  const { data: session } = useSession();

  // if (session?.user.role === "admin") {
  //   return <div>Welcome at admin page</div>;
  // }
  // return <div>You are not authorized to view this page</div>;
  if (session?.user.role !== "admin") {
    return (
      <>
        <p>You are not authorized to view this page</p>
      </>
    );
  }
  return (
    <>
      {/* Dodac liste zgloszonych postow po kolorze */}
      <div>Siema admin</div>
    </>
  );
};

export default index;
