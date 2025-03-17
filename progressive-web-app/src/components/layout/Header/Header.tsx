import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import InsightsIcon from "@mui/icons-material/Insights";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <InsightsIcon fontSize="large" />
      </div>
      <div className={styles.title}>Data Viewer App</div>
      <div>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
