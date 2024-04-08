import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/about", element:  <Suspense fallback="loading..."><LazyAbout /></Suspense> },
      { path: "/shop", element: <Suspense fallback="loading..."><LazyShop /></Suspense> },
    ],
  },
]);

container.render(<RouterProvider router={router}></RouterProvider>);
