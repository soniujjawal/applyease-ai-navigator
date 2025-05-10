
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experiences: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="grid grid-cols-[100px_1fr] items-center">
              <span className="font-medium">Name:</span>
              <span>{data.name}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] items-center">
              <span className="font-medium">Email:</span>
              <span>{data.email}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] items-center">
              <span className="font-medium">Phone:</span>
              <span>{data.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.experiences.map((exp, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium">{exp.title}</h4>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
              <p className="text-sm">{exp.description}</p>
              {index < data.experiences.length - 1 && (
                <hr className="my-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium">{edu.degree}</h4>
              <div className="flex justify-between">
                <p className="text-sm">{edu.institution}</p>
                <span className="text-sm text-muted-foreground">{edu.year}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
