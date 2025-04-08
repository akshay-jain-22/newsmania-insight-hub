
import React from "react";
import { Badge } from "@/components/ui/badge";

interface NewsCardImageProps {
  imageUrl: string | null;
  title: string;
  sourceName?: string;
  category?: string;
}

export function NewsCardImage({ imageUrl, title, sourceName, category }: NewsCardImageProps) {
  // Define category-based placeholder images
  const getCategoryPlaceholder = (category?: string) => {
    const placeholders = {
      business: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      technology: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop",
      sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop",
      health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=500&fit=crop",
      science: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=500&fit=crop",
      entertainment: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800&h=500&fit=crop",
      general: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
      default: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop"
    };
    
    if (!category) return placeholders.default;
    return placeholders[category.toLowerCase() as keyof typeof placeholders] || placeholders.default;
  };

  // Use the provided image URL or fall back to a placeholder
  const displayImageUrl = imageUrl || getCategoryPlaceholder(category);

  return (
    <div className="relative h-48 overflow-hidden">
      <img
        src={displayImageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        onError={(e) => {
          // If the image fails to load, use a placeholder based on category
          (e.target as HTMLImageElement).src = getCategoryPlaceholder(category);
        }}
      />
      {sourceName && (
        <div className="absolute left-0 bottom-0 p-2 w-full bg-gradient-to-t from-black/80 to-transparent">
          <Badge className="source-badge bg-primary/90 hover:bg-primary text-xs uppercase tracking-wide">
            {sourceName}
          </Badge>
        </div>
      )}
    </div>
  );
}
