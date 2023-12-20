import React from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import RecipePage from "@/pages/recipe-page";
import SearchLayout from "@/components/layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <SearchLayout />,
    children: [{ path: "recipe", element: <RecipePage /> }],
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
