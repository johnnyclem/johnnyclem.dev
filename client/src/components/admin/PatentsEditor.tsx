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
import { type Patent, type InsertPatent } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function PatentsEditor() {
  const { toast } = useToast();
  const [editingPatent, setEditingPatent] = useState<Patent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertPatent>>({
    number: "",
    title: "",
    year: "",
    company: "",
    status: "",
    description: "",
    category: "",
    imageUrl: "",
    sortOrder: 0,
  });

  const { data: patents = [], isLoading } = useQuery<Patent[]>({
    queryKey: ["/api/patents"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPatent) => {
      const res = await apiRequest("POST", "/api/patents", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patents"] });
      toast({ title: "Success", description: "Patent created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPatent> }) => {
      const res = await apiRequest("PATCH", `/api/patents/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patents"] });
      toast({ title: "Success", description: "Patent updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/patents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patents"] });
      toast({
        title: "Success",
        description: "Patent deleted successfully",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      number: "",
      title: "",
      year: "",
      company: "",
      status: "",
      description: "",
      category: "",
      imageUrl: "",
      sortOrder: 0,
    });
    setEditingPatent(null);
  };

  const handleEdit = (patent: Patent) => {
    setEditingPatent(patent);
    setFormData({
      number: patent.number,
      title: patent.title,
      year: patent.year,
      company: patent.company,
      status: patent.status,
      description: patent.description,
      category: patent.category,
      imageUrl: patent.imageUrl || "",
      sortOrder: patent.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: InsertPatent = {
      number: formData.number!,
      title: formData.title!,
      year: formData.year!,
      company: formData.company!,
      status: formData.status!,
      description: formData.description!,
      category: formData.category!,
      imageUrl: formData.imageUrl,
      sortOrder: formData.sortOrder || 0,
    };

    if (editingPatent) {
      updateMutation.mutate({ id: editingPatent.id, data });
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
            <CardTitle>Patents</CardTitle>
            <CardDescription>Manage your patents and innovations</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} data-testid="button-add-patent">
                <Plus className="w-4 h-4 mr-2" />
                Add Patent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPatent ? "Edit Patent" : "Add Patent"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Patent Number</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      placeholder="US-12345678"
                      required
                      data-testid="input-patent-number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2024"
                      required
                      data-testid="input-patent-year"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Patent title"
                    required
                    data-testid="input-patent-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                      required
                      data-testid="input-patent-company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      placeholder="Granted, Pending, etc."
                      required
                      data-testid="input-patent-status"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Video Processing, AI/ML, etc."
                    required
                    data-testid="input-patent-category"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Patent description"
                    rows={4}
                    required
                    data-testid="input-patent-description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.png"
                    data-testid="input-patent-image-url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    data-testid="input-patent-sort-order"
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
                      <>{editingPatent ? "Update" : "Create"} Patent</>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {patents.map((patent) => (
        <Card key={patent.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg">{patent.title}</CardTitle>
                  <Badge>{patent.status}</Badge>
                </div>
                <CardDescription>
                  {patent.number} • {patent.company} ({patent.year})
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(patent)}
                  data-testid={`button-edit-patent-${patent.id}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(patent.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-patent-${patent.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{patent.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
