
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsCardSkeleton } from "@/components/NewsCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewsArticle, fetchNewsBySearch } from "@/lib/api";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setPage(1);
      setArticles([]);
    }
  };

  useEffect(() => {
    const query = queryParams.get("q");
    if (query) {
      setSearchQuery(query);
      
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const data = await fetchNewsBySearch(query, page);
          
          if (page === 1) {
            setArticles(data);
          } else {
            // Filter out duplicates before adding to the list
            const newArticles = data.filter(
              newArticle => !articles.some(
                existingArticle => existingArticle.url === newArticle.url
              )
            );
            setArticles(prev => [...prev, ...newArticles]);
          }
          
          setHasMore(data.length > 0);
        } catch (error) {
          console.error("Error searching news:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }
  }, [location.search, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto gap-2">
              <Input
                type="search"
                placeholder="Search for news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          {queryParams.get("q") && (
            <h2 className="section-title">
              Search Results for "{queryParams.get("q")}"
            </h2>
          )}

          {isLoading && page === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {articles.length === 0 && !isLoading && queryParams.get("q") ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try different keywords or check your spelling.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <NewsCard key={`${article.url}-${index}`} article={article} />
                  ))}
                </div>
              )}

              {hasMore && articles.length > 0 && (
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
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
