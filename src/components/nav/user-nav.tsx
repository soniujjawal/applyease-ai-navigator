
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-service";

export function UserNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  const getInitials = () => {
    if (!user || !user.email) return "U";
    
    // Try to use user.user_metadata.full_name from GitHub if available
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
    
    if (fullName) {
      return fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    
    // Fall back to email
    return user.email.substring(0, 2).toUpperCase();
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  const getName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.name || 
           user?.user_metadata?.username || 
           user?.email?.split('@')[0] || 
           "User";
  };

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              {getAvatarUrl() && <AvatarImage src={getAvatarUrl()} alt={getName()} />}
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{getName()}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/applications")}>
              Applications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
