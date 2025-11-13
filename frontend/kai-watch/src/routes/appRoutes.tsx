import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import CustomLoader from "../components/CustomLoading";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Vulnerabilities = lazy(() => import("../pages/Vulnerabilities"));
const Packages = lazy(() => import("../pages/Packages"));
const Comparison = lazy(() => import("../pages/Comparison"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<CustomLoader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/compare" element={<Comparison />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
