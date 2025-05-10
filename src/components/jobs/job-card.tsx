
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  skills: string[];
  description: string;
  matchScore: number;
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => Promise<boolean>;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const { toast } = useToast();

  const handleApply = async () => {
    try {
      setIsApplying(true);
      const success = await onApply(job.id);
      if (success) {
        setApplied(true);
        toast({
          title: "Application submitted!",
          description: `Your application for ${job.title} at ${job.company} has been submitted.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsApplying(false);
    }
  };
  
  const getMatchColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${applied ? 'border-primary/40' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm">Match</span>
              <div className="flex items-center space-x-1">
                <div 
                  className={`h-2.5 w-2.5 rounded-full ${getMatchColor(job.matchScore)}`}
                ></div>
                <span className="text-sm font-medium">{job.matchScore}%</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{job.postedAt}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="grid gap-3">
          <div className="flex gap-2 text-sm">
            <Badge variant="outline">{job.type}</Badge>
            <Badge variant="outline">{job.location}</Badge>
            {job.salary && <Badge variant="outline">{job.salary}</Badge>}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 5).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 5} more
              </Badge>
            )}
          </div>
          
          <p className="text-sm line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleApply} 
          disabled={isApplying || applied}
        >
          {isApplying ? (
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Applying...</span>
            </div>
          ) : applied ? (
            "Applied ✓"
          ) : (
            "Apply Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
