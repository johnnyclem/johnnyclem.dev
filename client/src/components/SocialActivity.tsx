import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ExternalLink, GitCommit, Twitter } from "lucide-react";
import { SiStackoverflow } from "react-icons/si";
import type { Profile } from "@shared/schema";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository?: {
    name: string;
    full_name: string;
  };
}

export default function SocialActivity() {
  const twitterContainerRef = useRef<HTMLDivElement>(null);
  
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: commits = [], isLoading: commitsLoading } = useQuery<GitHubCommit[]>({
    queryKey: ["github-commits", profile?.githubUsername],
    queryFn: async () => {
      if (!profile?.githubUsername) return [];
      
      try {
        // Fetch user's events (includes commits across all repos)
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/events/public?per_page=30`,
          {
            headers: {
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch GitHub activity');
        
        const events = await response.json();
        
        // Filter for push events and extract commits
        const commitEvents = events
          .filter((event: any) => event.type === 'PushEvent' && event.payload.commits)
          .flatMap((event: any) => 
            (event.payload.commits || []).map((commit: any) => ({
              sha: commit.sha,
              commit: {
                message: commit.message,
                author: {
                  name: event.actor.login,
                  date: event.created_at,
                },
              },
              html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
              repository: {
                name: event.repo.name.split('/')[1],
                full_name: event.repo.name,
              },
            }))
          )
          .slice(0, 5); // Get most recent 5 commits
        
        return commitEvents;
      } catch (error) {
        console.error('Error fetching GitHub commits:', error);
        return [];
      }
    },
    enabled: !!profile?.githubUsername,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Load Twitter widget script
  useEffect(() => {
    if (profile?.twitterHandle && twitterContainerRef.current) {
      // Load Twitter widget script if not already loaded
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
      } else {
        // Reload widgets if script already loaded
        window.twttr.widgets.load();
      }
    }
  }, [profile?.twitterHandle]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'yesterday';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateMessage = (message: string, maxLength: number = 80) => {
    const firstLine = message.split('\n')[0];
    if (firstLine.length <= maxLength) return firstLine;
    return firstLine.substring(0, maxLength) + '...';
  };

  return (
    <section id="social-activity" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Activity & Connect</h2>
            <p className="text-xl text-muted-foreground">
              Follow my latest work and connect across platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GitHub Recent Commits */}
            {profile?.githubUsername && (
              <Card data-testid="card-github-activity">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      <CardTitle className="text-xl">Recent Commits</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      data-testid="link-github-profile"
                    >
                      <a
                        href={`https://github.com/${profile.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <CardDescription>
                    Latest contributions on GitHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {commitsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : commits.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No recent commits found
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {commits.map((commit) => (
                        <a
                          key={commit.sha}
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-md hover-elevate transition-all"
                          data-testid={`commit-${commit.sha.substring(0, 7)}`}
                        >
                          <div className="flex items-start gap-3">
                            <GitCommit className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium mb-1">
                                {truncateMessage(commit.commit.message)}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {commit.repository && (
                                  <Badge variant="secondary" className="text-xs">
                                    {commit.repository.name}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(commit.commit.author.date)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {commit.sha.substring(0, 7)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Twitter/X Timeline */}
            {profile?.twitterHandle && (
              <Card data-testid="card-twitter-timeline">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5" />
                      <CardTitle className="text-xl">Recent Posts</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      data-testid="link-twitter-profile"
                    >
                      <a
                        href={`https://twitter.com/${profile.twitterHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <CardDescription>
                    Latest thoughts and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div ref={twitterContainerRef}>
                    <a
                      className="twitter-timeline"
                      data-height="400"
                      data-theme="dark"
                      data-chrome="noheader nofooter noborders"
                      data-tweet-limit="3"
                      href={`https://twitter.com/${profile.twitterHandle}?ref_src=twsrc%5Etfw`}
                    >
                      Loading tweets...
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Links */}
            <Card data-testid="card-professional-links" className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Connect With Me</CardTitle>
                <CardDescription>
                  Find me across professional networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {profile?.linkedin && (
                    <Button
                      variant="outline"
                      asChild
                      data-testid="link-linkedin"
                    >
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}

                  {profile?.githubUsername && (
                    <Button
                      variant="outline"
                      asChild
                      data-testid="link-github"
                    >
                      <a
                        href={`https://github.com/${profile.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}

                  {profile?.twitterHandle && (
                    <Button
                      variant="outline"
                      asChild
                      data-testid="link-twitter"
                    >
                      <a
                        href={`https://twitter.com/${profile.twitterHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Twitter className="w-5 h-5" />
                        Twitter/X
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}

                  {profile?.stackOverflowUrl && (
                    <Button
                      variant="outline"
                      asChild
                      data-testid="link-stackoverflow"
                    >
                      <a
                        href={profile.stackOverflowUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <SiStackoverflow className="w-5 h-5" />
                        Stack Overflow
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
