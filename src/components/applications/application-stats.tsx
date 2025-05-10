
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Application } from "@/components/applications/application-card";

interface ApplicationStatsProps {
  applications: Application[];
}

export function ApplicationStats({ applications }: ApplicationStatsProps) {
  const totalApplications = applications.length;
  const viewedApplications = applications.filter(a => a.status === "viewed").length;
  const interviewApplications = applications.filter(a => a.status === "interview").length;
  const offerApplications = applications.filter(a => a.status === "offer").length;
  const rejectedApplications = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApplications}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Resume Viewed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{viewedApplications}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{interviewApplications}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{offerApplications}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Rejections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rejectedApplications}</div>
        </CardContent>
      </Card>
    </div>
  );
}
