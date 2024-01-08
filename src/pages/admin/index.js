import { useSession } from "next-auth/react";

const index = (props) => {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return <div>Welcome at admin page</div>;
  }
  return <div>You are not authorized to view this page</div>;
};

export default index;
