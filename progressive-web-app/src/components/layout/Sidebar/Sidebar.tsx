import { NavLink } from "react-router-dom";
import { SIDEBAR_OPTIONS } from "../../../config/sidebar";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          {SIDEBAR_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <li key={option.path}>
                <NavLink
                  to={option.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <div className={styles.labelContainer}>
                    <Icon fontSize="medium" className={styles.icon} />
                    <span className={styles.label}> {option.label}</span>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
