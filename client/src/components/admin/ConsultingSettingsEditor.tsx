import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type ConsultingSettings, type InsertConsultingSettings } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function ConsultingSettingsEditor() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InsertConsultingSettings>>({
    dayRate: 2000,
    hourlyRate: 180,
    calendlyUrl: "",
  });

  const { data: settings, isLoading } = useQuery<ConsultingSettings>({
    queryKey: ["/api/consulting/settings"],
    refetchOnMount: true,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        dayRate: settings.dayRate,
        hourlyRate: settings.hourlyRate,
        calendlyUrl: settings.calendlyUrl,
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertConsultingSettings>) => {
      const res = await apiRequest("PATCH", "/api/consulting/settings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/consulting/settings"] });
      toast({ title: "Success", description: "Consulting settings updated successfully" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData as InsertConsultingSettings);
  };

  if (isLoading) {
    return (
      <Card data-testid="card-consulting-settings">
        <CardHeader>
          <CardTitle>Consulting Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-consulting-settings">
      <CardHeader>
        <CardTitle>Consulting Settings</CardTitle>
        <CardDescription>Configure your consulting rates and Calendly integration</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dayRate">Day Rate ($)</Label>
                <Input
                  id="dayRate"
                  type="number"
                  value={formData.dayRate || ""}
                  onChange={(e) => setFormData({ ...formData, dayRate: parseInt(e.target.value) })}
                  required
                  data-testid="input-day-rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate || ""}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
                  required
                  data-testid="input-hourly-rate"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calendlyUrl">Calendly URL</Label>
              <Input
                id="calendlyUrl"
                type="url"
                placeholder="https://calendly.com/your-username/30min"
                value={formData.calendlyUrl || ""}
                onChange={(e) => setFormData({ ...formData, calendlyUrl: e.target.value })}
                required
                data-testid="input-calendly-url"
              />
              <p className="text-xs text-muted-foreground">
                Your Calendly scheduling link (e.g., https://calendly.com/your-username/30min)
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={updateMutation.isPending}
            data-testid="button-save-settings"
          >
            {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
