import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/Auth/LoginPage";
import StoresPage from "../pages/Stores/StoresPage";
import SKUPage from "../pages/SKU/SKU";
import Planning from "../pages/Planning/Planning";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/stores" replace />} />
          <Route path="/stores" element={<Layout />}>
            <Route index element={<StoresPage />} />
          </Route>
          <Route path="/sku" element={<Layout />}>
            <Route index element={<SKUPage />} />
          </Route>
          <Route path="/planning" element={<Layout />}>
            <Route index element={<Planning />} />
          </Route>
          <Route path="*" element={<Navigate to="/stores" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
