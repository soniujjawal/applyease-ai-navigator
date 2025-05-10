
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Briefcase, 
  Settings, 
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "Applications",
    href: "/applications",
    icon: Briefcase,
  },
  {
    title: "Job Search",
    href: "/jobs",
    icon: Search,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const location = useLocation();
  
  return (
    <nav className="grid gap-2 p-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
            location.pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
