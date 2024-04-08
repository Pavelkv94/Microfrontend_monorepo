import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@/components/App";
//@ts-ignore
import shopRoutes from'shop/Router';
//@ts-ignore
import adminRoutes from'admin/Router';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [ //! сюда можно внедрять как роуты(чтобы микрофронты были отдельными страницами) так и копоненты
        ...shopRoutes,
        ...adminRoutes
      ],
    },
  ]);