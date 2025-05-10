
import { useState, useEffect } from "react";
import { ApplicationStats } from "@/components/applications/application-stats";
import { ApplicationCard, Application } from "@/components/applications/application-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Demo data
const mockApplications: Application[] = [
  {
    id: "app1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    appliedDate: "May 5, 2025",
    status: "applied",
    matchScore: 85
  },
  {
    id: "app2",
    jobTitle: "UI/UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    appliedDate: "May 3, 2025",
    status: "interview",
    matchScore: 92
  },
  {
    id: "app3",
    jobTitle: "Product Manager",
    company: "Software Solutions",
    location: "San Francisco, CA",
    appliedDate: "April 28, 2025",
    status: "offer",
    matchScore: 78
  },
  {
    id: "app4",
    jobTitle: "Backend Engineer",
    company: "DataTech",
    location: "Chicago, IL",
    appliedDate: "April 25, 2025",
    status: "viewed",
    matchScore: 81
  },
  {
    id: "app5",
    jobTitle: "Full Stack Developer",
    company: "StartupX",
    location: "Remote",
    appliedDate: "April 22, 2025",
    status: "rejected",
    matchScore: 75
  },
  {
    id: "app6",
    jobTitle: "DevOps Engineer",
    company: "CloudCorp",
    location: "Seattle, WA",
    appliedDate: "April 20, 2025",
    status: "applied",
    matchScore: 88
  },
  {
    id: "app7",
    jobTitle: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    appliedDate: "April 18, 2025",
    status: "viewed",
    matchScore: 89
  }
];

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Simulate loading applications data
    const loadApplications = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setApplications(mockApplications);
      } catch (error) {
        console.error("Failed to load applications", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...applications];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(search) || 
        app.company.toLowerCase().includes(search)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

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
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
        <p className="text-muted-foreground">
          Track and manage your job applications.
        </p>
      </div>
      
      <ApplicationStats applications={applications} />
      
      <Separator />

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setStatusFilter}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="viewed">Viewed</TabsTrigger>
            <TabsTrigger value="interview">Interviews</TabsTrigger>
            <TabsTrigger value="offer">Offers</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="w-[200px] pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              defaultValue="newest"
              onValueChange={() => {}} // TODO: Implement sorting
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="match">Match Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border p-10 flex flex-col items-center justify-center">
              <p className="text-muted-foreground mb-4">
                No applications found matching your filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        {["applied", "viewed", "interview", "offer", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border p-10 flex flex-col items-center justify-center">
                <p className="text-muted-foreground mb-4">
                  No applications found in this category.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  View All Applications
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Applications;
