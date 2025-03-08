import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.topLayoutContainer}>
        <Header />
      </div>
      <div className={styles.bottomLayoutContainer}>
        <Sidebar />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
