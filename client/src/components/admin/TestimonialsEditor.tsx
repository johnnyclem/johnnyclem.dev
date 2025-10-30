import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, Edit, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Testimonial, type InsertTestimonial } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function TestimonialsEditor() {
  const { toast } = useToast();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertTestimonial>>({
    clientName: "",
    clientTitle: "",
    clientCompany: "",
    quote: "",
    avatarUrl: "",
    rating: 5,
    sortOrder: 0,
  });

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/consulting/testimonials"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const res = await apiRequest("POST", "/api/consulting/testimonials", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consulting/testimonials"] });
      toast({ title: "Success", description: "Testimonial created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTestimonial> }) => {
      const res = await apiRequest("PATCH", `/api/consulting/testimonials/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consulting/testimonials"] });
      toast({ title: "Success", description: "Testimonial updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/consulting/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consulting/testimonials"] });
      toast({ title: "Success", description: "Testimonial deleted successfully" });
    },
  });

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientTitle: "",
      clientCompany: "",
      quote: "",
      avatarUrl: "",
      rating: 5,
      sortOrder: 0,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      clientCompany: testimonial.clientCompany,
      quote: testimonial.quote,
      avatarUrl: testimonial.avatarUrl || "",
      rating: testimonial.rating,
      sortOrder: testimonial.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: InsertTestimonial = {
      clientName: formData.clientName!,
      clientTitle: formData.clientTitle!,
      clientCompany: formData.clientCompany!,
      quote: formData.quote!,
      avatarUrl: formData.avatarUrl || null,
      rating: formData.rating!,
      sortOrder: formData.sortOrder!,
    };

    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const sortedTestimonials = [...testimonials].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <Card data-testid="card-testimonials-editor">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage client testimonials for your consulting page</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm" data-testid="button-add-testimonial">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ""}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                    data-testid="input-client-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientTitle">Title *</Label>
                  <Input
                    id="clientTitle"
                    value={formData.clientTitle || ""}
                    onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
                    required
                    data-testid="input-client-title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientCompany">Company *</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany || ""}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  required
                  data-testid="input-client-company"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Testimonial Quote *</Label>
                <Textarea
                  id="quote"
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={4}
                  required
                  data-testid="input-quote"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5) *</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    required
                    data-testid="input-rating"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order *</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder ?? 0}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                    required
                    data-testid="input-sort-order"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatarUrl || ""}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  data-testid="input-avatar-url"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-testimonial"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingTestimonial ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : sortedTestimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No testimonials yet. Click "Add Testimonial" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {sortedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} data-testid={`testimonial-${testimonial.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">{testimonial.clientName}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.clientTitle}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.clientCompany}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(testimonial)}
                        data-testid={`button-edit-${testimonial.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(testimonial.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${testimonial.id}`}
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
