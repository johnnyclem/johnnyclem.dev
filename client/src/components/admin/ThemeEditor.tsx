import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw } from "lucide-react";
import type { ThemeSettings, InsertThemeSettings, UpdateThemeSettings } from "@shared/schema";
import { debounce } from "lodash";

export function ThemeEditor() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InsertThemeSettings>>({
    primaryColor: "220 85% 58%",
    accentColor: "142 85% 50%",
    backgroundColor: "222 47% 11%",
    foregroundColor: "213 31% 91%",
    fontFamily: "Inter",
    headingFontFamily: "Inter",
  });

  const { data: settings } = useQuery<ThemeSettings>({
    queryKey: ["/api/theme-settings"],
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        primaryColor: settings.primaryColor,
        accentColor: settings.accentColor,
        backgroundColor: settings.backgroundColor,
        foregroundColor: settings.foregroundColor,
        fontFamily: settings.fontFamily,
        headingFontFamily: settings.headingFontFamily,
      });
    }
  }, [settings]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertThemeSettings) => {
      const res = await apiRequest("POST", "/api/theme-settings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/theme-settings"] });
      toast({ title: "Success", description: "Theme settings created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateThemeSettings) => {
      const res = await apiRequest("PATCH", `/api/theme-settings/${settings?.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/theme-settings"] });
      toast({ title: "Success", description: "Theme settings updated" });
    },
  });

  const handleSave = () => {
    const data: InsertThemeSettings | UpdateThemeSettings = {
      primaryColor: formData.primaryColor!,
      accentColor: formData.accentColor!,
      backgroundColor: formData.backgroundColor!,
      foregroundColor: formData.foregroundColor!,
      fontFamily: formData.fontFamily!,
      headingFontFamily: formData.headingFontFamily!,
    };

    if (settings) {
      updateMutation.mutate(data as UpdateThemeSettings);
    } else {
      createMutation.mutate(data as InsertThemeSettings);
    }
  };

  const handleReset = () => {
    const defaults: Partial<InsertThemeSettings> = {
      primaryColor: "220 85% 58%",
      accentColor: "142 85% 50%",
      backgroundColor: "222 47% 11%",
      foregroundColor: "213 31% 91%",
      fontFamily: "Inter",
      headingFontFamily: "Inter",
    };
    setFormData(defaults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Customization</CardTitle>
        <CardDescription>
          Customize the visual appearance of your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
              <Input
                id="primaryColor"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                placeholder="220 85% 58%"
                data-testid="input-primary-color"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color (HSL)</Label>
              <Input
                id="accentColor"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                placeholder="142 85% 50%"
                data-testid="input-accent-color"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
              <Input
                id="backgroundColor"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                placeholder="222 47% 11%"
                data-testid="input-background-color"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foregroundColor">Foreground Color (HSL)</Label>
              <Input
                id="foregroundColor"
                value={formData.foregroundColor}
                onChange={(e) => setFormData({ ...formData, foregroundColor: e.target.value })}
                placeholder="213 31% 91%"
                data-testid="input-foreground-color"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Body Font Family</Label>
              <Input
                id="fontFamily"
                value={formData.fontFamily}
                onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                placeholder="Inter"
                data-testid="input-font-family"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headingFontFamily">Heading Font Family</Label>
              <Input
                id="headingFontFamily"
                value={formData.headingFontFamily}
                onChange={(e) => setFormData({ ...formData, headingFontFamily: e.target.value })}
                placeholder="Inter"
                data-testid="input-heading-font-family"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} data-testid="button-save-theme">
              <Save className="w-4 h-4 mr-2" />
              Save Theme
            </Button>
            <Button variant="outline" onClick={handleReset} data-testid="button-reset-theme">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-md border">
                <h2 className="text-2xl font-bold mb-2">
                  Preview Heading
                </h2>
                <p className="text-muted-foreground">
                  This is a preview. HSL values are used in the theme system.
                </p>
                <p className="text-sm mt-4">
                  Primary: {formData.primaryColor}<br />
                  Accent: {formData.accentColor}<br />
                  Background: {formData.backgroundColor}<br />
                  Foreground: {formData.foregroundColor}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
