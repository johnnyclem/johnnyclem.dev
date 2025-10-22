import { useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, User, Code, Briefcase, Award, FolderKanban, Building } from "lucide-react";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { ExperienceEditor } from "@/components/admin/ExperienceEditor";
import { PatentsEditor } from "@/components/admin/PatentsEditor";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { CompaniesEditor } from "@/components/admin/CompaniesEditor";

export default function Admin() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check session authentication on server
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) {
          localStorage.removeItem("admin_authenticated");
          setLocation("/admin/login");
        }
      })
      .catch(() => {
        setLocation("/admin/login");
      });
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin_authenticated");
      setLocation("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Admin</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              data-testid="button-view-portfolio"
            >
              View Portfolio
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">
              <Code className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="experience" data-testid="tab-experience">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="patents" data-testid="tab-patents">
              <Award className="w-4 h-4 mr-2" />
              Patents
            </TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">
              <FolderKanban className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="companies" data-testid="tab-companies">
              <Building className="w-4 h-4 mr-2" />
              Companies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileEditor />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="patents">
            <PatentsEditor />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsEditor />
          </TabsContent>

          <TabsContent value="companies">
            <CompaniesEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
