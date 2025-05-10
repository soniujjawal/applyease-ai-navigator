
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

interface FilterOptions {
  jobType: string[];
  location: string;
  minSalary: number;
  skills: string[];
  experience: string;
  search: string;
}

interface JobFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function JobFilter({ onFilterChange }: JobFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    jobType: [],
    location: "",
    minSalary: 0,
    skills: [],
    experience: "",
    search: "",
  });

  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: keyof FilterOptions, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleJobTypeChange = (type: string) => {
    setFilters((prev) => {
      const newJobTypes = prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type)
        : [...prev.jobType, type];
      
      const newFilters = { ...prev, jobType: newJobTypes };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSkillChange = (skill: string) => {
    setFilters((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      
      const newFilters = { ...prev, skills: newSkills };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, skills, companies..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setExpanded(!expanded)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </form>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded-lg">
          <div>
            <h3 className="font-medium mb-3">Job Type</h3>
            <div className="space-y-2">
              {["Full-time", "Part-time", "Contract", "Remote", "Internship"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-type-${type}`}
                    checked={filters.jobType.includes(type)}
                    onCheckedChange={() => handleJobTypeChange(type)}
                  />
                  <label
                    htmlFor={`job-type-${type}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
            
            <div>
              <Label>Experience Level</Label>
              <Select
                value={filters.experience}
                onValueChange={(value) => handleChange("experience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="exec">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Minimum Salary</Label>
                <span className="text-sm">${filters.minSalary * 1000}</span>
              </div>
              <Slider
                value={[filters.minSalary]}
                min={0}
                max={200}
                step={5}
                onValueChange={(values) => handleChange("minSalary", values[0])}
                className="py-4"
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="skills">
                <AccordionTrigger>Skills</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {["JavaScript", "React", "Node.js", "TypeScript", "Python", "Java", "AWS"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleSkillChange(skill)}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}
