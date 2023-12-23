import React from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import RecipePage from "@/pages/recipe-page";
import SearchLayout from "@/components/layout";
import RecipeContent, {
  loader as recipeDetailLoader,
} from "@/features/recipe/recipe-content";
import AddRecipe from "@/features/recipe/recipe-add";
import { loader as rootLayoutLoader } from "@/pages/home";
import PaperPage from "@/pages/paper";

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <SearchLayout />,
    loader: rootLayoutLoader,
    children: [
      {
        path: "recipe",
        element: <RecipePage />,
        children: [
          {
            index: true,
            element: <RecipeContent.Default />,
          },
          {
            path: ":recipeId",
            element: <RecipeContent />,
            loader: recipeDetailLoader,
          },
          { path: "new", element: <AddRecipe /> },
        ],
      },
      {
        path: "paper",
        element: <PaperPage />,
        children: [
          {
            path: "a",
            element: <PaperPage />,
            children: [{ path: "1", element: <PaperPage /> }],
          },
        ],
      },
    ],
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
