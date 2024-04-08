import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";
import App from "@/components/App";
import UserCard from "@packages/shared/src/components/UserCard"

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: "/shop/main",
        element: (
          <Suspense fallback="loading...">
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: "/shop/second",
        element: (
          <Suspense fallback="loading...">
            <div>THE SECOOND PAGE
              <br/>
              <UserCard user="PAVE LKAZLOU" />

            </div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
