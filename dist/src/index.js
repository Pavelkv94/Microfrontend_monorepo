import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";
var root = document.getElementById("root");
if (!root) {
    throw new Error("root not found");
}
var container = createRoot(root);
var router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
        children: [
            { path: "/about", element: _jsx(Suspense, { fallback: "loading...", children: _jsx(LazyAbout, {}) }) },
            { path: "/shop", element: _jsx(Suspense, { fallback: "loading...", children: _jsx(LazyShop, {}) }) },
        ],
    },
]);
container.render(_jsx(RouterProvider, { router: router }));
