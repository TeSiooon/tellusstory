import { useSession } from "next-auth/react";

const CheckRole = () => {
  const { data: session } = useSession();
  if (session?.user.role !== "admin") {
    return (
      <>
        <p>You are not authorized to view this page</p>
      </>
    );
  }
};

export default CheckRole;
