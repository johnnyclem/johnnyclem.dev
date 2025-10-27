import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Skill, type InsertSkill } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function SkillsEditor() {
  const { toast } = useToast();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertSkill>>({
    category: "",
    title: "",
    icon: "",
    color: "",
    items: [],
    specializations: [],
    sortOrder: 0,
  });

  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertSkill) => {
      const res = await apiRequest("POST", "/api/skills", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Success", description: "Skill created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSkill> }) => {
      const res = await apiRequest("PATCH", `/api/skills/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Success", description: "Skill updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      category: "",
      title: "",
      icon: "",
      color: "",
      items: [],
      specializations: [],
      sortOrder: 0,
    });
    setEditingSkill(null);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      category: skill.category,
      title: skill.title,
      icon: skill.icon,
      color: skill.color,
      items: skill.items,
      specializations: skill.specializations,
      sortOrder: skill.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: InsertSkill = {
      category: formData.category!,
      title: formData.title!,
      icon: formData.icon!,
      color: formData.color!,
      items: formData.items!,
      specializations: formData.specializations || [],
      sortOrder: formData.sortOrder || 0,
    };

    if (editingSkill) {
      updateMutation.mutate({ id: editingSkill.id, data });
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
            <CardTitle>Skills</CardTitle>
            <CardDescription>Manage your skill categories</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} data-testid="button-add-skill">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSkill ? "Edit Skill" : "Add Skill"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Technical, Product, etc."
                      required
                      data-testid="input-skill-category"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Programming"
                      required
                      data-testid="input-skill-title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="Code, Palette, etc."
                      required
                      data-testid="input-skill-icon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="blue, purple, etc."
                      required
                      data-testid="input-skill-color"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items">Items (comma-separated)</Label>
                  <Textarea
                    id="items"
                    value={formData.items?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value.split(",").map(s => s.trim()) })}
                    placeholder="JavaScript, TypeScript, Python"
                    rows={3}
                    required
                    data-testid="input-skill-items"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specializations">Specializations (comma-separated, optional)</Label>
                  <Textarea
                    id="specializations"
                    value={formData.specializations?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, specializations: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
                    placeholder="React, Node.js, Django"
                    rows={2}
                    data-testid="input-skill-specializations"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    data-testid="input-skill-sort-order"
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
                      <>{editingSkill ? "Update" : "Create"} Skill</>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {skills.map((skill) => (
        <Card key={skill.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>{skill.title}</CardTitle>
                <CardDescription>{skill.category}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(skill)}
                  data-testid={`button-edit-skill-${skill.id}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(skill.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-skill-${skill.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {skill.items.join(", ")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
