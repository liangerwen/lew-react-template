import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/index";
import NotFind from "./pages/404";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { IconApps, IconMenu } from "@arco-design/web-react/icon";
import { SettingProvider } from "./components/Settings";
import useMode from "./components/Settings/ModeSetting/useMode";
import useTheme from "./components/Settings/ThemeSetting/useTheme";
import { Spin } from "@arco-design/web-react";
import { lazy, Suspense } from "react";

const lazyload = (importFn) => {
  const LazyComp = lazy(importFn);
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      }
    >
      <LazyComp />
    </Suspense>
  );
};
export interface CustomRoutes {
  name: string;
  path?: string;
  children?: CustomRoutes[];
  element?: React.ReactElement;
  icon?: React.ReactElement;
  inMenu?: boolean;
  breadcrumb?: boolean;
}

export const MenuRoutes: CustomRoutes[] = [
  {
    name: "page.welcome",
    path: "welcome",
    element: lazyload(() => import("./pages/Home/Welcome")),
    icon: <IconApps />,
    breadcrumb: false,
  },
  {
    name: "page.menus",
    icon: <IconMenu />,
    path: "menus",
    children: [
      {
        name: "page.welcome",
        path: "welcome1",
        element: lazyload(() => import("./pages/Home/Welcome")),
        icon: <IconApps />,
      },
      {
        name: "page.welcome",
        path: "welcome2",
        element: lazyload(() => import("./pages/Home/Welcome")),
        icon: <IconApps />,
        inMenu: false,
      },
      {
        name: "page.welcome",
        path: "welcome3",
        element: lazyload(() => import("./pages/Home/Welcome")),
        icon: <IconApps />,
        breadcrumb: false,
      },
    ],
  },
];

export default function App() {
  // 初始化模式
  useMode();
  // 初始化主题
  useTheme();

  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
          children: MenuRoutes,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFind />,
    },
  ]);

  return <SettingProvider>{element}</SettingProvider>;
}
