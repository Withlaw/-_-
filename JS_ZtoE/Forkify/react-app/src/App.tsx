import React from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import RecipePage from "@/pages/recipe";
import SearchLayout from "@/pages/root-layout";
import RecipeContent, {
  loader as recipeDetailLoader,
} from "@/features/recipes/recipe-detail/recipe-detail.component";
import AddRecipe from "@/features/recipes/recipe-add/recipe-add.component";
import { loader as authTokenLoader } from "@/pages/home";
import PaperPage from "@/pages/paper";

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <SearchLayout />,
    loader: authTokenLoader,
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
      // {
      //   path: "paper",
      //   element: <PaperPage />,
      //   children: [
      //     {
      //       path: "a",
      //       element: <PaperPage />,
      //       children: [{ path: "1", element: <PaperPage /> }],
      //     },
      //   ],
      // },
    ],
  },
];

const router = createBrowserRouter(
  routes.map(route => {
    // 모든 라우트를 순회하려면 깊은 탐색 하거나
    // 라우트를 flat하게 작성해야함. -> 레이아웃 상속이 안됨.
    return route;
  })
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
