
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";
import { useAuth } from "@/components/auth/auth-service";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signInWithGithub } = useAuth();
  
  const handleGithubLogin = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGithub();
      // Note: No need to manually navigate as the OAuth redirect will handle this
      // The redirect_to option will send users to the dashboard after auth
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log in with GitHub. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Button 
          onClick={handleGithubLogin} 
          className="w-full flex items-center gap-2" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Github className="h-5 w-5" />
          )}
          Sign in with GitHub
        </Button>

        <Separator />
        
        <div className="text-center text-sm text-muted-foreground">
          Don't have a GitHub account?{" "}
          <a 
            href="https://github.com/signup" 
            target="_blank" 
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
