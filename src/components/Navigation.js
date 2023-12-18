import Link from "next/link";
import styles from "./Navigation.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navigation = (props) => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <nav className="flex h-2/6 px-8 bg-[#D8C3A5]">
      <p className={`flex items-center w-40 text-white`}>TELL ME STORY</p>
      <ul className="flex flex-row w-full items-center justify-end space-x-8">
        <li>
          <Link className={styles.menu__link} href="/">
            Główna
          </Link>
        </li>
        <li>
          <Link className={styles.menu__link} href="/">
            Poczekalnia
          </Link>
        </li>
        <li>
          {status === "unauthenticated" && (
            <button className={styles.menu__link} onClick={signIn}>
              Login
            </button>
          )}
          {status === "authenticated" && (
            <button className={styles.menu__link} onClick={signOut}>
              Sing out{" "}
              <span className="font-bold text-[#E98074]">
                ({session.user.name})
              </span>
            </button>
          )}
        </li>

        {/* Jesli jest zalogowany wyswietla link do formularza */}
        {status === "authenticated" && (
          <li>
            <Link className={styles.menu__link} href="/new-story">
              Dodaj
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
