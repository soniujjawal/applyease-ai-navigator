
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/nav/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col">
        <MainNav />
        
        <main className="flex-1">
          {/* Hero section */}
          <section className="py-20 px-6 md:py-32 md:px-10 lg:px-16 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(at_top_right,_#3b82f6_0%,transparent_60%)] dark:bg-[radial-gradient(at_top_right,_#1d4ed8_0%,transparent_60%)] opacity-20"></div>
            
            <div className="max-w-5xl mx-auto space-y-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
                Apply Smarter, Not Harder, with{" "}
                <span className="text-primary">ApplyEase</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                Use AI to match your resume with the perfect jobs and apply automatically. Save time and increase your chances of landing your dream job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
                <Button size="lg" onClick={() => navigate("/signup")} className="px-8">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
                  Log In
                </Button>
              </div>
            </div>
          </section>
          
          {/* Features section */}
          <section className="py-16 px-6 md:px-10 lg:px-16 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How ApplyEase Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Upload Your Resume</h3>
                  <p className="text-muted-foreground">Simply upload your resume and our AI will analyze your skills, experience, and qualifications.</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Discover Matching Jobs</h3>
                  <p className="text-muted-foreground">Our AI matches your profile with thousands of job listings to find the perfect opportunities for you.</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Apply With One Click</h3>
                  <p className="text-muted-foreground">Apply to multiple jobs with a single click and track your applications in one dashboard.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA section */}
          <section className="py-20 px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to transform your job search?</h2>
              <p className="text-xl text-muted-foreground">Join thousands of job seekers who are saving time and getting more interviews.</p>
              <Button size="lg" onClick={() => navigate("/signup")} className="px-8">
                Start Your Free Trial
              </Button>
            </div>
          </section>
        </main>
        
        <footer className="border-t py-10 px-6 md:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span className="text-primary">Apply</span>
                <span>Ease</span>
              </span>
              <span className="text-muted-foreground text-sm">© 2025 ApplyEase</span>
            </div>
            
            <div className="flex gap-2 md:gap-4">
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Contact</Button>
              <ThemeToggle />
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
