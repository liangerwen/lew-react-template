import { SettingProvider } from "./components/Settings";
import useMode from "./components/Settings/ModeSetting/useMode";
import useTheme from "./components/Settings/ThemeSetting/useTheme";
import Router from "./Router";

export default function App() {
  // 初始化模式
  useMode();
  // 初始化主题
  useTheme();

  return (
    <SettingProvider>
      <Router />
    </SettingProvider>
  );
}
