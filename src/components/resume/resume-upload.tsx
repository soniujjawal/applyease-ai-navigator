
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (data: any) => void;
}

export function ResumeUpload({ onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a file to upload",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Simulate file upload
    const mockData = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploaded: new Date().toISOString(),
      extractedData: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (123) 456-7890",
        skills: ["JavaScript", "React", "TypeScript", "Node.js", "HTML", "CSS"],
        experiences: [
          {
            title: "Frontend Developer",
            company: "Tech Solutions Inc.",
            period: "Jan 2020 - Present",
            description: "Developed responsive web applications using React and TypeScript."
          },
          {
            title: "Web Developer",
            company: "Digital Agency",
            period: "Mar 2018 - Dec 2019",
            description: "Created websites and web applications for various clients."
          }
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of Technology",
            year: "2018"
          }
        ]
      }
    };

    clearInterval(interval);
    setProgress(100);
    
    setTimeout(() => {
      setUploading(false);
      onUploadComplete(mockData);
      
      toast({
        title: "Resume uploaded!",
        description: "Your resume has been successfully analyzed.",
      });
    }, 400);
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="resume">Upload your resume</Label>
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium overflow-hidden">
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="gap-2"
          >
            <Upload size={16} />
            Upload
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX. Max size: 5MB.
        </p>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading & analyzing...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
}
