
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ResumeUpload } from "@/components/resume/resume-upload";
import { ResumePreview } from "@/components/resume/resume-preview";

const Resume = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resume data from storage
    const loadResume = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get resume data from localStorage if available
        const savedResumeData = localStorage.getItem("resumeData");
        if (savedResumeData) {
          setResumeData(JSON.parse(savedResumeData).extractedData);
        }
      } catch (error) {
        console.error("Failed to load resume data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, []);

  const handleUploadComplete = (data: any) => {
    setResumeData(data.extractedData);
    localStorage.setItem("resumeData", JSON.stringify(data));
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
        <h2 className="text-3xl font-bold tracking-tight">Resume</h2>
        <p className="text-muted-foreground">
          Upload and manage your resume for job applications.
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue={resumeData ? "preview" : "upload"} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="preview" disabled={!resumeData}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="space-y-4">
            <ResumeUpload onUploadComplete={handleUploadComplete} />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          {resumeData ? (
            <ResumePreview data={resumeData} />
          ) : (
            <div className="rounded-md border p-10 flex items-center justify-center">
              <p className="text-muted-foreground">
                Please upload a resume first to preview.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resume;
