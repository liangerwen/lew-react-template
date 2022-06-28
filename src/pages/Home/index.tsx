import { Breadcrumb, Layout, Menu } from "@arco-design/web-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CustomRoutes, MenuRoutes } from "@/App";
import { concatPath } from "@/utils";
import { useSettings } from "@/components/Settings";
import useLocale from "@/hooks/useLocale";
import Footer from "@/components/Footer";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const homePath = "/home";

export default function Home() {
  const location = useLocation();
  const { t } = useLocale();
  const breadcrumbMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const [breadcrumb, setBreadcrumb] = useState<React.ReactNode[]>([]);

  const { pageSetting } = useSettings();

  useEffect(() => {
    setBreadcrumb(breadcrumbMap.current.get(location.pathname) || []);
  }, [location, t]);

  const renderMenus = useCallback(
    (routes: CustomRoutes[], basePath = homePath) => {
      return routes.map((item) => {
        const path = concatPath(basePath, item.path!);
        if (item.breadcrumb !== false) {
          if (basePath === homePath) {
            breadcrumbMap.current.set(path, [item.icon || t(item.name)]);
          } else {
            const preRoutes = breadcrumbMap.current.get(basePath) || [];
            breadcrumbMap.current.set(path, [...preRoutes, t(item.name)]);
            breadcrumbMap.current.delete(basePath);
          }
        }
        if (item.inMenu === false) return null;
        if (item.children) {
          return (
            <SubMenu
              key={path}
              title={
                <>
                  {item.icon} {t(item.name)}
                </>
              }
            >
              {renderMenus(item.children, path)}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={path}>
            <Link className="block" to={path}>
              {item.icon} {t(item.name)}
            </Link>
          </MenuItem>
        );
      });
    },
    [t]
  );

  return (
    <Layout>
      {pageSetting.menu && (
        <Layout.Sider width={pageSetting.menuWidth}>
          <Menu
            className="w-full h-full"
            autoOpen
            defaultSelectedKeys={[location.pathname]}
          >
            {renderMenus(MenuRoutes)}
          </Menu>
        </Layout.Sider>
      )}
      <Layout.Content className="bg-[var(--color-fill-2)] p-4 flex flex-col min-h-full box-border">
        <Breadcrumb>
          {breadcrumb.map((b, idx) => (
            <Breadcrumb.Item key={idx}>{b}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </Layout.Content>
    </Layout>
  );
}
