import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Patent } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function PatentsEditor() {
  const { toast } = useToast();
  const { data: patents = [], isLoading } = useQuery<Patent[]>({
    queryKey: ["/api/patents"],
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
          <Button data-testid="button-add-patent">
            <Plus className="w-4 h-4 mr-2" />
            Add Patent
          </Button>
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
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{patent.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
