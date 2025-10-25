import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Plus, Edit, GripVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMediaAppearanceSchema, type MediaAppearance, type InsertMediaAppearance } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = insertMediaAppearanceSchema.extend({
  publishedAt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AppearancesManager() {
  const [editingAppearance, setEditingAppearance] = useState<MediaAppearance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: appearances = [] } = useQuery<MediaAppearance[]>({
    queryKey: ["/api/media-appearances"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      type: "podcast",
      publishedAt: "",
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertMediaAppearance) => {
      const response = await apiRequest("POST", "/api/admin/media-appearances", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-appearances"] });
      toast({ title: "Appearance created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error creating appearance", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertMediaAppearance> }) => {
      const response = await apiRequest("PATCH", `/api/admin/media-appearances/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-appearances"] });
      toast({ title: "Appearance updated successfully" });
      setIsDialogOpen(false);
      setEditingAppearance(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error updating appearance", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/media-appearances/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-appearances"] });
      toast({ title: "Appearance deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting appearance", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (values: FormValues) => {
    const data: InsertMediaAppearance = {
      ...values,
      publishedAt: values.publishedAt ? new Date(values.publishedAt) : undefined,
    };

    if (editingAppearance) {
      updateMutation.mutate({ id: editingAppearance.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (appearance: MediaAppearance) => {
    setEditingAppearance(appearance);
    form.reset({
      title: appearance.title,
      description: appearance.description || "",
      videoUrl: appearance.videoUrl,
      type: appearance.type,
      publishedAt: appearance.publishedAt ? new Date(appearance.publishedAt).toISOString().split('T')[0] : "",
      sortOrder: appearance.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this appearance?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewAppearance = () => {
    setEditingAppearance(null);
    form.reset({
      title: "",
      description: "",
      videoUrl: "",
      type: "podcast",
      publishedAt: "",
      sortOrder: appearances.length,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" data-testid="text-appearances-title">Media Appearances</h2>
          <p className="text-muted-foreground" data-testid="text-appearances-description">
            Manage podcast appearances, speaking engagements, and interviews
          </p>
        </div>
        <Button onClick={handleNewAppearance} data-testid="button-add-appearance">
          <Plus className="w-4 h-4 mr-2" />
          Add Appearance
        </Button>
      </div>

      <div className="grid gap-4">
        {appearances.map((appearance, index) => (
          <Card key={appearance.id} className="hover-elevate" data-testid={`card-appearance-${index}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg" data-testid={`text-title-${index}`}>{appearance.title}</CardTitle>
                  {appearance.description && (
                    <CardDescription className="mt-1" data-testid={`text-description-${index}`}>
                      {appearance.description}
                    </CardDescription>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(appearance)}
                    data-testid={`button-edit-${index}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(appearance.id)}
                    data-testid={`button-delete-${index}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-1 rounded-md bg-secondary capitalize" data-testid={`badge-type-${index}`}>
                  {appearance.type}
                </span>
                {appearance.publishedAt && (
                  <span data-testid={`text-date-${index}`}>
                    {new Date(appearance.publishedAt).toLocaleDateString()}
                  </span>
                )}
                <a 
                  href={appearance.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-testid={`link-video-${index}`}
                >
                  View Video →
                </a>
              </div>
            </CardContent>
          </Card>
        ))}

        {appearances.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground" data-testid="text-no-appearances">
                No media appearances yet. Click "Add Appearance" to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle data-testid="text-dialog-title">
              {editingAppearance ? "Edit Appearance" : "New Appearance"}
            </DialogTitle>
            <DialogDescription>
              Add details about a podcast, speaking engagement, or interview
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Podcast Interview" data-testid="input-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        value={field.value || ""}
                        placeholder="A discussion about..." 
                        rows={3}
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormDescription>Optional description of the appearance</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://youtu.be/..." 
                        data-testid="input-video-url"
                      />
                    </FormControl>
                    <FormDescription>Full YouTube video URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="podcast">Podcast</SelectItem>
                        <SelectItem value="speaking">Speaking</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="conversation">Conversation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published Date</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="date" 
                        data-testid="input-published-date"
                      />
                    </FormControl>
                    <FormDescription>Optional publication date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        data-testid="input-sort-order"
                      />
                    </FormControl>
                    <FormDescription>Display order (lower numbers appear first)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingAppearance(null);
                    form.reset();
                  }}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit"
                >
                  {editingAppearance ? "Update" : "Create"} Appearance
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
