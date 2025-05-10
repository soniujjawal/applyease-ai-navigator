
import { useState, useEffect } from "react";
import { JobCard, Job } from "@/components/jobs/job-card";
import { JobFilter } from "@/components/jobs/job-filter";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Demo data
const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$120K-$150K",
    postedAt: "2 days ago",
    skills: ["JavaScript", "React", "TypeScript", "CSS", "HTML"],
    description: "We are looking for a skilled Senior Frontend Developer to join our team. You will be responsible for developing and implementing user interface components using React.js and related technologies. You will work with the design team to ensure the technical feasibility of UI/UX designs.",
    matchScore: 95
  },
  {
    id: "job2",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90K-$120K",
    postedAt: "3 days ago",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
    description: "Design Studio is seeking a talented UI/UX Designer to create amazing user experiences. You will be responsible for the design and implementation of user interfaces that facilitate user interactions and optimize the user experience.",
    matchScore: 88
  },
  {
    id: "job3",
    title: "Full Stack Developer",
    company: "StartupX",
    location: "Remote",
    type: "Contract",
    salary: "$70-$90/hr",
    postedAt: "1 week ago",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    description: "StartupX is looking for a Full Stack Developer to help build our next generation platforms. You will be working with a team of developers to create and maintain full-stack web applications.",
    matchScore: 93
  },
  {
    id: "job4",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$130K-$160K",
    postedAt: "5 days ago",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    description: "Join our team as a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll be responsible for deployment, automation, and monitoring.",
    matchScore: 87
  },
  {
    id: "job5",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$110K-$140K",
    postedAt: "1 week ago",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    description: "Analytics Pro is seeking a Data Scientist to join our growing team. You will analyze large datasets, develop predictive models, and extract actionable insights.",
    matchScore: 79
  },
  {
    id: "job6",
    title: "Product Manager",
    company: "TechInnovate",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130K-$170K",
    postedAt: "3 days ago",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
    description: "TechInnovate is looking for a talented Product Manager to join our team. You will be responsible for the product planning and execution throughout the product lifecycle.",
    matchScore: 82
  }
];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading jobs data
    const loadJobs = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      } catch (error) {
        console.error("Failed to load jobs", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load job listings. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [toast]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(search) || 
        job.company.toLowerCase().includes(search) || 
        job.description.toLowerCase().includes(search) ||
        job.skills.some((skill: string) => skill.toLowerCase().includes(search))
      );
    }
    
    // Apply job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      filtered = filtered.filter(job => filters.jobType.includes(job.type));
    }
    
    // Apply location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(job => job.location.toLowerCase().includes(location));
    }
    
    // Apply minimum salary filter
    if (filters.minSalary > 0) {
      const minSalary = filters.minSalary * 1000;
      filtered = filtered.filter(job => {
        if (!job.salary) return true;
        const salaryMatch = job.salary.match(/\$(\d+)K/);
        if (!salaryMatch) return true;
        const jobSalary = parseInt(salaryMatch[1]) * 1000;
        return jobSalary >= minSalary;
      });
    }
    
    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(job =>
        filters.skills.some((skill: string) => job.skills.includes(skill))
      );
    }
    
    setFilteredJobs(filtered);
  };

  const handleApplyToJob = async (jobId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to applications in localStorage
    const application = jobs.find(job => job.id === jobId);
    if (application) {
      toast({
        title: "Application submitted!",
        description: `Your application for ${application.title} at ${application.company} has been submitted.`,
      });
    }
    
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Job Matching</h2>
        <p className="text-muted-foreground">
          Browse and apply to jobs that match your profile.
        </p>
      </div>
      
      <JobFilter onFilterChange={handleFilterChange} />
      
      <Separator />
      
      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your profile and preferences
          </p>
        </div>
        
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={handleApplyToJob} 
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border p-10 flex items-center justify-center">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
