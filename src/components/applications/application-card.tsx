
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: "applied" | "viewed" | "interview" | "offer" | "rejected";
  matchScore: number;
}

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-500";
      case "viewed":
        return "bg-yellow-500";
      case "interview":
        return "bg-purple-500";
      case "offer":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied";
      case "viewed":
        return "Resume Viewed";
      case "interview":
        return "Interview";
      case "offer":
        return "Offer";
      case "rejected":
        return "Not Selected";
      default:
        return status;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case "applied":
        return 20;
      case "viewed":
        return 40;
      case "interview":
        return 60;
      case "offer":
        return 100;
      case "rejected":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
            <p className="text-muted-foreground">{application.company}</p>
          </div>
          <Badge 
            variant="outline"
            className="text-xs"
          >
            {application.location}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Applied: {application.appliedDate}</span>
            <div className="flex items-center gap-2">
              <span>Match</span>
              <Badge variant="secondary">
                {application.matchScore}%
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Application Status</span>
              <div className="flex items-center gap-2">
                <div 
                  className={`h-2 w-2 rounded-full ${getStatusColor(application.status)}`}
                ></div>
                <span>{getStatusText(application.status)}</span>
              </div>
            </div>
            <Progress 
              value={getProgressValue(application.status)} 
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
