import { useEffect, useState } from "react";
import { NewsArticle, fetchNewsByCategory, categoryTitles } from "@/lib/api";
import { NewsCard } from "@/components/NewsCard";
import { NewsCardSkeleton } from "@/components/NewsCardSkeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { toast } from "sonner";

interface NewsGridProps {
  category: string;
  limit?: number;
}

export function NewsGrid({ category, limit }: NewsGridProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  const fetchNews = async (showToast = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNewsByCategory(category, page);
      
      // Process articles - add category field for image selection
      const processedData = data.map(article => {
        return {
          ...article,
          category: category // Add category for image placeholder selection
        };
      });
      
      if (processedData.length === 0 && page === 1) {
        setError("No articles found for this category.");
        setHasMore(false);
      } else {
        if (page === 1) {
          setArticles(processedData);
          setLastUpdate(new Date());
          if (showToast) {
            toast.success(`News updated for ${categoryTitles[category] || category}`);
          }
        } else {
          // Filter out duplicates before adding to the list
          const newArticles = processedData.filter(
            newArticle => !articles.some(
              existingArticle => existingArticle.url === newArticle.url
            )
          );
          setArticles(prev => [...prev, ...newArticles]);
        }
        
        setHasMore(processedData.length > 0);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch news when component mounts or category/page changes
  useEffect(() => {
    fetchNews();
  }, [category, page]);

  // Set up automatic refresh every hour
  useEffect(() => {
    // Only set up auto-refresh if enabled
    if (!autoRefreshEnabled) return;
    
    console.log(`Setting up auto-refresh for ${category} news every hour`);
    
    const hourlyInterval = setInterval(() => {
      if (page === 1) {
        // Only auto-refresh the first page
        console.log(`Auto-refreshing ${category} news...`);
        fetchNews(false); // Don't show toast for automatic updates
      }
    }, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds = 1 hour
    
    // For demo/testing purposes - refresh every 5 minutes
    const demoInterval = setInterval(() => {
      if (page === 1) {
        console.log(`Demo refresh for ${category} news (5-minute interval)`);
        fetchNews(false);
      }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => {
      clearInterval(hourlyInterval);
      clearInterval(demoInterval);
    };
  }, [category, page, autoRefreshEnabled]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
  }, [category]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleManualRefresh = () => {
    if (page === 1) {
      fetchNews(true); // Show toast for manual refresh
    } else {
      // If we're on a page other than 1, go back to page 1 and refresh
      setPage(1);
    }
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled(prev => !prev);
    if (!autoRefreshEnabled) {
      toast.success("Auto-refresh enabled");
    } else {
      toast.info("Auto-refresh disabled");
    }
  };

  // Limit the number of articles if specified
  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="section-title">{categoryTitles[category] || category}</h2>
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleManualRefresh}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh Now"}
          </Button>
          <Button
            size="sm"
            variant={autoRefreshEnabled ? "default" : "outline"}
            onClick={toggleAutoRefresh}
          >
            {autoRefreshEnabled ? "Auto-Refresh On" : "Auto-Refresh Off"}
          </Button>
          {lastUpdate && (
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            Using mock data since we can't access the News API directly from the browser.
            On a production site, these API calls would be made from a server.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
          
          {!limit && hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                className="min-w-32"
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
