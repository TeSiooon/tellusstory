import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = (props) => {
  const path = usePathname();

  return (
    <Link href={props.href} className={path === props.href ? "font-bold" : ""}>
      {props.children}
    </Link>
  );
};

export default NavLink;
