import React from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Layout from "@/components/Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true }],
  },
];

const router = createBrowserRouter(
  routes.map(route => {
    return route;
  })
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
