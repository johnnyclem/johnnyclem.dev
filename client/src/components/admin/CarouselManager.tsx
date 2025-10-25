import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload, GripVertical, Image as ImageIcon } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MediaAsset } from "@shared/schema";

export function CarouselManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: assets = [], isLoading } = useQuery<MediaAsset[]>({
    queryKey: ["/api/media-assets"],
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, title, description }: { file: File; title: string; description: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description || "");
      formData.append("mediaType", "image");
      formData.append("sortOrder", assets.length.toString());

      const response = await fetch("/api/admin/media-assets", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-assets"] });
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast({ title: "Media uploaded successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to upload media", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/media-assets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media-assets"] });
      toast({ title: "Media deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete media", description: error.message, variant: "destructive" });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile && title.trim()) {
      uploadMutation.mutate({
        file: selectedFile,
        title: title.trim(),
        description: description.trim(),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media asset?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div data-testid="text-loading">Loading media assets...</div>;
  }

  return (
    <Card data-testid="card-carousel-manager">
      <CardHeader>
        <CardTitle data-testid="text-title">Carousel Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-medium" data-testid="text-upload-heading">Upload New Media</h3>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload" data-testid="label-file">Image File</Label>
            <Input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              data-testid="input-file"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground" data-testid="text-selected-file">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" data-testid="label-title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" data-testid="label-description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              data-testid="input-description"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !title.trim() || uploadMutation.isPending}
            data-testid="button-upload"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploadMutation.isPending ? "Uploading..." : "Upload Media"}
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium" data-testid="text-existing-heading">Existing Media ({assets.length})</h3>
          {assets.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid="text-no-assets">
              No media assets yet. Upload one above to get started.
            </p>
          ) : (
            <div className="grid gap-3">
              {assets.map((asset, index) => (
                <div
                  key={asset.id}
                  className="flex gap-3 items-start p-3 border rounded-lg"
                  data-testid={`asset-item-${index}`}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  
                  <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                    {asset.thumbnailUrl ? (
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-thumbnail-${index}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" data-testid={`text-asset-title-${index}`}>
                      {asset.title}
                    </p>
                    {asset.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-asset-description-${index}`}>
                        {asset.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Type: {asset.mediaType}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(asset.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${index}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
