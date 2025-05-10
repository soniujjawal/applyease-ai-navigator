
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "@/components/auth/signup-form";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <ThemeProvider defaultTheme="system">
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span>Apply</span>
                <span>Ease</span>
              </span>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "ApplyEase has completely transformed how I search for jobs. I've received more responses in two weeks than I did in two months of traditional applying!"
              </p>
              <footer className="text-sm">Sarah Johnson, Software Engineer</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-4 lg:p-8 flex flex-col justify-center items-center w-full">
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <ThemeToggle />
          </div>
          <div className="lg:hidden flex items-center mb-10 space-x-2">
            <span className="font-bold text-2xl">
              <span className="text-primary">Apply</span>
              <span>Ease</span>
            </span>
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your details to create your ApplyEase account
              </p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
