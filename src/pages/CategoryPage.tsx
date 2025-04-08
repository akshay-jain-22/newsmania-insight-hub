
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsGrid } from "@/components/NewsGrid";
import { categoryTitles } from "@/lib/api";

const CategoryPage = () => {
  const { category = "general" } = useParams<{ category: string }>();
  
  // Ensure we have a valid category name for display
  const categoryTitle = categoryTitles[category] || category;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <NewsGrid category={category} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
