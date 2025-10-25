import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ChatPrompt } from "@shared/schema";

export function ChatPromptsEditor() {
  const [newPrompt, setNewPrompt] = useState("");
  const { toast } = useToast();

  const { data: prompts = [], isLoading } = useQuery<ChatPrompt[]>({
    queryKey: ["/api/admin/chat/prompts"],
  });

  const createMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/admin/chat/prompts", {
        prompt,
        sortOrder: prompts.length,
        isActive: true,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chat/prompts"] });
      setNewPrompt("");
      toast({ title: "Prompt created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create prompt", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ChatPrompt> }) => {
      const response = await apiRequest("PATCH", `/api/admin/chat/prompts/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chat/prompts"] });
      toast({ title: "Prompt updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update prompt", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/chat/prompts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chat/prompts"] });
      toast({ title: "Prompt deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete prompt", description: error.message, variant: "destructive" });
    },
  });

  const handleCreate = () => {
    if (newPrompt.trim()) {
      createMutation.mutate(newPrompt.trim());
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateMutation.mutate({ id, data: { isActive } });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div data-testid="text-loading">Loading prompts...</div>;
  }

  return (
    <Card data-testid="card-chat-prompts-editor">
      <CardHeader>
        <CardTitle data-testid="text-title">Chat Prompts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-prompt" data-testid="label-new-prompt">Add New Prompt</Label>
          <Textarea
            id="new-prompt"
            placeholder="Enter a suggested question or prompt..."
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            rows={3}
            data-testid="input-new-prompt"
          />
          <Button
            onClick={handleCreate}
            disabled={!newPrompt.trim() || createMutation.isPending}
            data-testid="button-add-prompt"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Prompt
          </Button>
        </div>

        <div className="space-y-3">
          {prompts.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid="text-no-prompts">
              No prompts yet. Add one above to get started.
            </p>
          ) : (
            prompts.map((prompt, index) => (
              <div
                key={prompt.id}
                className="flex gap-3 items-start p-3 border rounded-lg"
                data-testid={`prompt-item-${index}`}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm" data-testid={`text-prompt-${index}`}>{prompt.prompt}</p>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={prompt.isActive}
                      onCheckedChange={(checked) => handleToggleActive(prompt.id, checked)}
                      data-testid={`switch-active-${index}`}
                    />
                    <Label className="text-xs text-muted-foreground">
                      {prompt.isActive ? "Active" : "Inactive"}
                    </Label>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(prompt.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${index}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
