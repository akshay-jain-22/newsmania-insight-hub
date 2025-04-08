
import React from "react";
import { Calendar } from "lucide-react";
import { NewsArticle } from "@/lib/api";
import { NewsCardImage } from "./news/NewsCardImage";
import { NewsCardActions } from "./news/NewsCardActions";

interface NewsCardProps {
  article: NewsArticle;
  showActions?: boolean;
}

export function NewsCard({ article, showActions = true }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      return "Today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  // Truncate the title if it's too long
  const truncateTitle = (title: string, maxLength: number = 90) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="news-card overflow-hidden flex flex-col h-full rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900">
      {/* News Card Image with Source Badge */}
      <NewsCardImage 
        imageUrl={article.urlToImage} 
        title={article.title}
        sourceName={article.source.name}
        category={article.category}
      />
      
      <div className="p-4 flex-grow flex flex-col">
        {/* Source name and timestamp */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{article.source.name}</span>
          <span className="text-xs text-muted-foreground">{formatTimeAgo(article.publishedAt)}</span>
        </div>
        
        {/* Headline */}
        <h3 className="news-headline text-lg font-semibold mb-2 line-clamp-3">
          {truncateTitle(article.title)}
        </h3>
        
        {/* Description - only show if not in action/compact mode */}
        {!showActions && article.description && (
          <p className="news-description text-sm text-muted-foreground line-clamp-2 mt-1">{article.description}</p>
        )}
        
        {/* Only show full description on cards with actions */}
        {showActions && article.description && (
          <p className="news-description text-sm text-muted-foreground line-clamp-3 mt-1">{article.description}</p>
        )}
        
        {showActions && (
          <div className="mt-auto pt-4">
            <NewsCardActions article={article} />
          </div>
        )}
      </div>
    </div>
  );
}
