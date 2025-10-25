import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertProfileSchema, type InsertProfile, type Profile } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function ProfileEditor() {
  const { toast } = useToast();
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const form = useForm<InsertProfile>({
    resolver: zodResolver(insertProfileSchema),
    values: profile ? {
      ...profile,
      bio: profile.bio || "",
      linkedin: profile.linkedin || "",
      githubUsername: profile.githubUsername || "",
      twitterHandle: profile.twitterHandle || "",
      stackOverflowUrl: profile.stackOverflowUrl || "",
      location: profile.location || "",
      yearsExperience: profile.yearsExperience || 0,
      patentCount: profile.patentCount || 0,
      devicesDeployed: profile.devicesDeployed || "",
      headshotUrl: profile.headshotUrl || "",
      heroBackgroundUrl: profile.heroBackgroundUrl || "",
    } : {
      name: "",
      title: "",
      subtitle: "",
      bio: "",
      email: "",
      linkedin: "",
      githubUsername: "",
      twitterHandle: "",
      stackOverflowUrl: "",
      location: "",
      yearsExperience: 0,
      patentCount: 0,
      devicesDeployed: "",
      headshotUrl: "",
      heroBackgroundUrl: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertProfile) => {
      if (!profile) {
        const res = await apiRequest("POST", "/api/profile", data);
        return res.json();
      }
      const res = await apiRequest("PATCH", `/api/profile/${profile.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
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
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your basic profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} data-testid="input-subtitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} data-testid="input-bio" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-linkedin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years Experience</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-years-experience" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Social Media</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="githubUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="username" data-testid="input-github-username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitterHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter/X Handle</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="@username" data-testid="input-twitter-handle" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stackOverflowUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stack Overflow URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://stackoverflow.com/users/..." data-testid="input-stackoverflow-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patentCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patent Count</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-patent-count" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="devicesDeployed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devices Deployed</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 1B+" data-testid="input-devices-deployed" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={updateMutation.isPending} data-testid="button-save-profile">
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
