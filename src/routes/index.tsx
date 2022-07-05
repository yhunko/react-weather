import React from "react";
import { Outlet, Route, Routes as RouterRoutes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";

const IndexRoute = React.lazy(() => import("src/routes/Index"));
const DetailsRoute = React.lazy(() => import("src/routes/Details"));

const Routes: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <RouterRoutes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route index element={<IndexRoute />} />
        <Route path="details/:cityId" element={<DetailsRoute />} />
      </Route>
    </RouterRoutes>
  </React.Suspense>
);

export default Routes;
