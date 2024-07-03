import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Link className={styles.logo} href="/">
            NEXT
          </Link>
          <ul>
            <li className={styles.list}>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} href="/Addbook">
                Add Book
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.link} href="/Booklist">
                Book List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
