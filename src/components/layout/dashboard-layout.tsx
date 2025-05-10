
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { DashboardNav } from "@/components/nav/dashboard-nav";
import { UserNav } from "@/components/nav/user-nav";
import { ThemeProvider } from "@/components/theme-provider";

export function DashboardLayout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex min-h-screen flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 flex">
          <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar">
            <DashboardNav />
          </aside>
          <main className="flex-1 p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
