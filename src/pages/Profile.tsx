
import { useState, useEffect } from "react";
import { ProfileForm } from "@/components/profile/profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const mockProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (123) 456-7890",
  bio: "Experienced software engineer with 5 years of experience in frontend development. Passionate about creating intuitive user experiences with modern technologies.",
  location: "San Francisco, CA",
  website: "https://johndoe.com",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe"
};

const Profile = () => {
  const [profileData, setProfileData] = useState(mockProfileData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data from API
    const loadUser = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Here you would typically fetch the user data from an API
        // For demo purposes, we'll use the mock data or localStorage
        const savedUserData = localStorage.getItem("user");
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          // Merge with mock data to ensure all fields are present
          setProfileData({
            ...mockProfileData,
            name: userData.name || mockProfileData.name,
            email: userData.email || mockProfileData.email,
          });
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleProfileUpdate = (data: any) => {
    setProfileData(data);
    
    // Update user in localStorage
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      localStorage.setItem("user", JSON.stringify({
        ...userData,
        name: data.name,
        email: data.email,
      }));
    }
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
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
          <TabsTrigger value="security">Password & Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="space-y-4">
            <ProfileForm 
              defaultValues={profileData}
              onSubmit={handleProfileUpdate}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <div className="rounded-md border p-10 flex items-center justify-center">
            <p className="text-muted-foreground">Job preferences will be available soon.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <div className="rounded-md border p-10 flex items-center justify-center">
            <p className="text-muted-foreground">Security settings will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
