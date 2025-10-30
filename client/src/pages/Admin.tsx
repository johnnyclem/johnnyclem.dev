import { useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, User, Code, Briefcase, Award, FolderKanban, Building, BookOpen, Palette, MessageCircle, Image, Mic, Handshake } from "lucide-react";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { ExperienceEditor } from "@/components/admin/ExperienceEditor";
import { PatentsEditor } from "@/components/admin/PatentsEditor";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { CompaniesEditor } from "@/components/admin/CompaniesEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { ThemeEditor } from "@/components/admin/ThemeEditor";
import { ChatPromptsEditor } from "@/components/admin/ChatPromptsEditor";
import { CarouselManager } from "@/components/admin/CarouselManager";
import AppearancesManager from "@/components/admin/AppearancesManager";
import { ConsultingSettingsEditor } from "@/components/admin/ConsultingSettingsEditor";
import { TestimonialsEditor } from "@/components/admin/TestimonialsEditor";

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
          <TabsList className="grid w-full grid-cols-12 mb-8">
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
            <TabsTrigger value="blog" data-testid="tab-blog">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="consulting" data-testid="tab-consulting">
              <Handshake className="w-4 h-4 mr-2" />
              Consulting
            </TabsTrigger>
            <TabsTrigger value="chatbot" data-testid="tab-chatbot">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chatbot
            </TabsTrigger>
            <TabsTrigger value="carousel" data-testid="tab-carousel">
              <Image className="w-4 h-4 mr-2" />
              Carousel
            </TabsTrigger>
            <TabsTrigger value="appearances" data-testid="tab-appearances">
              <Mic className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="theme" data-testid="tab-theme">
              <Palette className="w-4 h-4 mr-2" />
              Theme
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

          <TabsContent value="blog">
            <BlogEditor />
          </TabsContent>

          <TabsContent value="consulting">
            <div className="space-y-6">
              <ConsultingSettingsEditor />
              <TestimonialsEditor />
            </div>
          </TabsContent>

          <TabsContent value="chatbot">
            <ChatPromptsEditor />
          </TabsContent>

          <TabsContent value="carousel">
            <CarouselManager />
          </TabsContent>

          <TabsContent value="appearances">
            <AppearancesManager />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
