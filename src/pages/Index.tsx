
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NewsGrid } from "@/components/NewsGrid";
import { Features } from "@/components/Features";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { newsCategories } from "@/lib/api";

const Index = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="general" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="section-title mb-0">Latest News</h2>
                <TabsList className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7">
                  {["general", "business", "technology", "science", "health", "sports", "entertainment"].map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {newsCategories.map((category) => (
                <TabsContent key={category} value={category}>
                  <NewsGrid category={category} limit={6} />
                  <div className="flex justify-center mt-8">
                    <Button asChild>
                      <Link to={`/category/${category}`}>View All {category} News</Link>
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        <Features />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
