
import { useState } from "react";
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface FileUploadProps {
  onUploadComplete: (data: any) => void;
}

const extractName = (text: string): string => {
  const nameRegex = /[A-Z][a-z]+\s+[A-Z][a-z]+/;
  const match = text.match(nameRegex);
  return match ? match[0] : 'Name not found';
};

const extractEmail = (text: string): string => {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : 'Email not found';
};

const extractPhone = (text: string): string => {
  const phoneRegex = /\+?\d[\d\s-]{8,}\d/;
  const match = text.match(phoneRegex);
  return match ? match[0] : 'Phone not found';
};

const extractSkills = (text: string): string[] => {
  const skillKeywords = ['javascript', 'react', 'typescript', 'node.js', 'html', 'css', 'python', 'java', 'c#', 'sql'];
  const skills = skillKeywords
    .map(skill => text.toLowerCase().includes(skill) ? skill : null)
    .filter((skill): skill is string => skill !== null);
  return skills;
};

const extractExperiences = (text: string): any[] => {
  const experienceRegex = /(?<title>[\w\s]+)\s+at\s+(?<company>[\w\s]+)\s+(?<period>[\w\s]+\d{4}\s+-\s+[\w\s]+\d{4})/g;
  const experiences: any[] = [];
  let match;
  while ((match = experienceRegex.exec(text)) !== null) {
    experiences.push({
      title: match.groups?.title || 'Title not found',
      company: match.groups?.company || 'Company not found',
      period: match.groups?.period || 'Period not found',
      description: 'Description not found'
    });
  }
  return experiences;
};

const extractEducation = (text: string): any[] => {
  const educationRegex = /(?<degree>[\w\s]+)\s+from\s+(?<institution>[\w\s]+)\s+(?<year>\d{4})/g;
  const education: any[] = [];
  let match;
  while ((match = educationRegex.exec(text)) !== null) {
    education.push({
      degree: match.groups?.degree || 'Degree not found',
      institution: match.groups?.institution || 'Institution not found',
      year: match.groups?.year || 'Year not found'
    });
  }
  return education;
};

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

    // Upload file to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    try {
      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Read the file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      // Extract text from all pages
      let text = '';
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        text += content.items
          .filter((item): item is TextItem => 'str' in item)
          .map(item => item.str)
          .join(' ');
      }

      // Extract basic information from text
      const parsedData = {
        name: extractName(text),
        email: extractEmail(text),
        phone: extractPhone(text),
        skills: extractSkills(text),
        experiences: extractExperiences(text),
        education: extractEducation(text)
      };

      // Store parsed data in Supabase
      const { data: insertData, error: insertError } = await supabase
        .from('resumes')
        .insert([
          {
            file_name: file.name,
            file_path: filePath,
            parsed_data: parsedData,
            uploaded_at: new Date().toISOString(),
            user_id: (await supabase.auth.getUser()).data?.user?.id
          }
        ])
        .select();

      if (insertError) throw insertError;

      // Update progress
      setProgress(100);
      setUploading(false);

      // Pass real parsed data to preview
      onUploadComplete({
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded: new Date().toISOString(),
        extractedData: parsedData
      });

      toast({
        title: "Resume uploaded!",
        description: "Your resume has been successfully analyzed and stored.",
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload and process your resume. Please try again.",
      });
    } finally {
      setProgress(100);
      setUploading(false);
    }
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
