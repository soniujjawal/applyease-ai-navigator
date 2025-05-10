
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatusCard } from "@/components/dashboard/status-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/components/applications/application-card";
import { Job } from "@/components/jobs/job-card";
import { FileText, Briefcase, Search, ArrowRight } from "lucide-react";
import { 
  AreaChart, 
  BarChart,
  LineChart 
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Demo data
const applicationData = [
  {
    name: "Week 1",
    applications: 5,
    interviews: 0,
    offers: 0,
  },
  {
    name: "Week 2",
    applications: 8,
    interviews: 2,
    offers: 0,
  },
  {
    name: "Week 3",
    applications: 12,
    interviews: 4,
    offers: 1,
  },
  {
    name: "Week 4",
    applications: 10,
    interviews: 6,
    offers: 2,
  },
];

const applicationStatusData = [
  { name: "Applied", value: 15 },
  { name: "Viewed", value: 8 },
  { name: "Interview", value: 6 },
  { name: "Offer", value: 2 },
  { name: "Rejected", value: 5 },
];

const recentApplications: Application[] = [
  {
    id: "app1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    appliedDate: "2 days ago",
    status: "applied",
    matchScore: 85
  },
  {
    id: "app2",
    jobTitle: "UI/UX Designer",
    company: "Design Studio",
    location: "New York",
    appliedDate: "3 days ago",
    status: "interview",
    matchScore: 92
  },
  {
    id: "app3",
    jobTitle: "Product Manager",
    company: "Software Solutions",
    location: "San Francisco, CA",
    appliedDate: "1 week ago",
    status: "offer",
    matchScore: 78
  }
];

const recommendedJobs: Job[] = [
  {
    id: "job1",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    salary: "$120K-$150K",
    postedAt: "2 days ago",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    description: "We are seeking a skilled Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining our web applications, ensuring high performance and responsiveness.",
    matchScore: 91
  },
  {
    id: "job2",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$130K-$160K",
    postedAt: "1 day ago",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    description: "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll be responsible for deployment, automation, and monitoring.",
    matchScore: 88
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [totalApplications, setTotalApplications] = useState(0);
  const [activeInterviews, setActiveInterviews] = useState(0);
  const [matchingJobs, setMatchingJobs] = useState(0);
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      // Check if user has a resume
      try {
        const { data: resumes, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', session.user.id)
          .limit(1);
          
        if (error) throw error;
        setHasResume(resumes && resumes.length > 0);
        
        // Get application stats
        const { data: applications, error: appError } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', session.user.id);
          
        if (appError) throw appError;
        
        setTotalApplications(applications?.length || 0);
        setActiveInterviews(applications?.filter(app => app.status === 'interview')?.length || 0);
        
        // Get job count
        const { count, error: jobError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true });
          
        if (jobError) throw jobError;
        setMatchingJobs(count || 0);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fall back to demo data
        setTotalApplications(36);
        setActiveInterviews(4);
        setMatchingJobs(24);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleApplyToJob = async (jobId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Applied to job ${jobId}`);
    return true;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your job search.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Total Applications"
          value={totalApplications}
          icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
          linkTo="/applications"
          linkText="View applications"
        />
        <StatusCard
          title="Active Interviews"
          value={activeInterviews}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          linkTo="/applications"
          linkText="View interviews"
        />
        <StatusCard
          title="Job Matches"
          value={matchingJobs}
          description="Jobs matching your profile"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
          linkTo="/jobs"
          linkText="Browse jobs"
        />
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resume
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {hasResume ? (
              <div className="space-y-2">
                <div className="text-2xl font-bold">Uploaded</div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/resume")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Update Resume
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold">Not Uploaded</div>
                <Button 
                  variant="default" 
                  onClick={() => navigate("/resume")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Upload Resume
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Application Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChart
              className="h-[200px]"
              data={applicationData}
              series={[
                { dataKey: "applications", label: "Applications", color: "blue" },
                { dataKey: "interviews", label: "Interviews", color: "violet" },
                { dataKey: "offers", label: "Offers", color: "green" }
              ]}
              index="name"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              className="h-[200px]"
              data={applicationStatusData}
              index="name"
              series={[
                { dataKey: "value", label: "Jobs", color: "blue" }
              ]}
              valueFormatter={(value) => `${value} jobs`}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Applications</CardTitle>
            <Button variant="link" size="sm" onClick={() => navigate("/applications")} className="gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, i) => (
                <div key={app.id} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{app.jobTitle}</p>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`h-2 w-2 rounded-full ${
                        app.status === "applied" ? "bg-blue-500" :
                        app.status === "viewed" ? "bg-yellow-500" :
                        app.status === "interview" ? "bg-purple-500" :
                        app.status === "offer" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-xs capitalize">{app.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recommended Jobs</CardTitle>
            <Button variant="link" size="sm" onClick={() => navigate("/jobs")} className="gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/jobs?id=${job.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
