import { useSession } from "next-auth/react";

const CheckRole = ({ children }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";
  return <>{isAdmin ? children : <p>You are not authorized</p>}</>;
};

export default CheckRole;
