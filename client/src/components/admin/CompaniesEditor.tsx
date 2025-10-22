import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Company } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function CompaniesEditor() {
  const { toast } = useToast();
  const { data: companies = [], isLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/companies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
      toast({
        title: "Success",
        description: "Company deleted successfully",
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
            <CardTitle>Companies</CardTitle>
            <CardDescription>Manage companies featured in your portfolio</CardDescription>
          </div>
          <Button data-testid="button-add-company">
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {companies.map((company) => (
          <Card key={company.id} className="relative group">
            <CardHeader>
              <CardTitle className="text-base">{company.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteMutation.mutate(company.id)}
                disabled={deleteMutation.isPending}
                data-testid={`button-delete-company-${company.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
