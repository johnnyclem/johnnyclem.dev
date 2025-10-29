import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaAsset } from "@shared/schema";

interface IPhoneCarouselProps {
  autoScrollInterval?: number;
  className?: string;
}

export function IPhoneCarousel({ autoScrollInterval = 5000, className = "" }: IPhoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout>();

  const { data: assets = [], isLoading } = useQuery<MediaAsset[]>({
    queryKey: ["/api/media-assets"],
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % assets.length);
    setIsManualControl(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length);
    setIsManualControl(true);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsManualControl(true);
  };

  useEffect(() => {
    if (isManualControl || assets.length === 0 || !autoScrollInterval) return;

    autoScrollTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % assets.length);
    }, autoScrollInterval);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [assets.length, autoScrollInterval, isManualControl]);

  useEffect(() => {
    if (isManualControl) {
      const timer = setTimeout(() => {
        setIsManualControl(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isManualControl]);

  if (isLoading || assets.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`} data-testid="container-iphone-carousel">
      <div className="relative w-full max-w-sm">
        {/* iPhone Frame Container */}
        <div className="relative aspect-[9/19.5] bg-gradient-to-br from-gray-900 to-black rounded-[3.5rem] p-3 shadow-2xl">
          {/* Dynamic Island Notch */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-20" />
          
          {/* Screen Container */}
          <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-black">
            {assets.map((asset, index) => (
              <div
                key={asset.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                data-testid={`slide-${index}`}
              >
                <img
                  src={asset.url}
                  alt={asset.title || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  data-testid={`img-slide-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {assets.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover-elevate"
              onClick={prevSlide}
              data-testid="button-prev-slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover-elevate"
              onClick={nextSlide}
              data-testid="button-next-slide"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {assets.length > 1 && (
        <div className="flex gap-2" data-testid="container-dots">
          {assets.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover-elevate"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-dot-${index}`}
            />
          ))}
        </div>
      )}

      {assets[currentIndex]?.description && (
        <p className="text-sm text-muted-foreground text-center max-w-sm" data-testid="text-slide-description">
          {assets[currentIndex].description}
        </p>
      )}
    </div>
  );
}
