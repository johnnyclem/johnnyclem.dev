import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, PlayCircle } from "lucide-react";
import type { MediaAppearance } from "@shared/schema";

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export default function FeaturedIn() {
  const { data: appearances = [], isLoading } = useQuery<MediaAppearance[]>({
    queryKey: ["/api/media-appearances"],
  });

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 py-16 md:py-24" id="featured">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured In</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  if (appearances.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-16 md:py-24" id="featured" data-testid="section-featured">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
          Featured In
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-description">
          Podcast appearances, speaking engagements, and technical conversations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {appearances.map((appearance, index) => {
          const videoId = getYouTubeVideoId(appearance.videoUrl);
          
          return (
            <Card 
              key={appearance.id} 
              className="overflow-hidden hover-elevate" 
              data-testid={`card-appearance-${index}`}
            >
              <CardContent className="p-0">
                {videoId ? (
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={appearance.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      data-testid={`video-${index}`}
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-appearance-title-${index}`}>
                    {appearance.title}
                  </h3>
                  
                  {appearance.description && (
                    <p className="text-muted-foreground text-sm mb-3" data-testid={`text-appearance-description-${index}`}>
                      {appearance.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {appearance.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span data-testid={`text-appearance-date-${index}`}>
                          {new Date(appearance.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </span>
                      </div>
                    )}
                    
                    {appearance.type && (
                      <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground capitalize" data-testid={`badge-appearance-type-${index}`}>
                        {appearance.type}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
