import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Experience, type InsertExperience } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function ExperienceEditor() {
  const { toast } = useToast();
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertExperience>>({
    company: "",
    companyLogoUrl: "",
    role: "",
    period: "",
    location: "",
    type: "",
    achievements: [],
    sortOrder: 0,
  });

  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertExperience) => {
      const res = await apiRequest("POST", "/api/experiences", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Success", description: "Experience created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertExperience> }) => {
      const res = await apiRequest("PATCH", `/api/experiences/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({ title: "Success", description: "Experience updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/experiences/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      company: "",
      companyLogoUrl: "",
      role: "",
      period: "",
      location: "",
      type: "",
      achievements: [],
      sortOrder: 0,
    });
    setEditingExperience(null);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      companyLogoUrl: experience.companyLogoUrl || "",
      role: experience.role,
      period: experience.period,
      location: experience.location || "",
      type: experience.type,
      achievements: experience.achievements,
      sortOrder: experience.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: InsertExperience = {
      company: formData.company!,
      companyLogoUrl: formData.companyLogoUrl,
      role: formData.role!,
      period: formData.period!,
      location: formData.location,
      type: formData.type!,
      achievements: formData.achievements!,
      sortOrder: formData.sortOrder || 0,
    };

    if (editingExperience) {
      updateMutation.mutate({ id: editingExperience.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Manage your work history</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} data-testid="button-add-experience">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience ? "Edit Experience" : "Add Experience"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      required
                      data-testid="input-experience-company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Job title"
                      required
                      data-testid="input-experience-role"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period">Period</Label>
                    <Input
                      id="period"
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      placeholder="2020 - Present"
                      required
                      data-testid="input-experience-period"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="Full-time, Contract, etc."
                      required
                      data-testid="input-experience-type"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="San Francisco, CA"
                      data-testid="input-experience-location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyLogoUrl">Company Logo URL (optional)</Label>
                    <Input
                      id="companyLogoUrl"
                      value={formData.companyLogoUrl || ""}
                      onChange={(e) => setFormData({ ...formData, companyLogoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      data-testid="input-experience-logo-url"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements">Achievements (one per line)</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements?.join("\n") || ""}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split("\n").filter(s => s.trim()) })}
                    placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                    rows={6}
                    required
                    data-testid="input-experience-achievements"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    data-testid="input-experience-sort-order"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>{editingExperience ? "Update" : "Create"} Experience</>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {experiences.map((exp) => (
        <Card key={exp.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle>{exp.role}</CardTitle>
                  <Badge variant="outline">{exp.type}</Badge>
                </div>
                <CardDescription>
                  {exp.company} • {exp.period}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(exp)}
                  data-testid={`button-edit-experience-${exp.id}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(exp.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-experience-${exp.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx}>• {achievement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
