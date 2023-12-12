import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav className="flex h-12 px-8 bg-gray-900">
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
          {/* <SignIn /> */}
          <Link className={styles.menu__link} href="/">
            Zaloguj
          </Link>
        </li>
        {/* <button className=" text-white">Wyloguj</button> */}
      </ul>
    </nav>
  );
};

export default Navigation;