import React from 'react';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="header__container">
        <div className={styles.header__content}>
          <NavLink className={({ isActive }) =>
              isActive ? `${styles.header__link} ${styles.active}` : styles.header__link
            }
            to="/"
          >
            EditUsers
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.header__link} ${styles.active}` : styles.header__link
            }
            to="/user"
          >
            Users
          </NavLink>
        </div>
      </div>
    </header>
  );
}
