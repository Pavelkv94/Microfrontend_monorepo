import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { LazyAbout } from "@/pages/about/About.lazy";
import { Suspense } from "react";
import { router } from "./router/Router";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);



container.render(<RouterProvider router={router}></RouterProvider>);
