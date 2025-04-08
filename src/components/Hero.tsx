
import { FileText, Database, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/60 dark:bg-grid-slate-700/20 bg-[center_top_-1px] dark:border-b dark:border-slate-50/[0.1] -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Version 1.0 Release
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
              <span className="text-primary">NewsMania</span>
              <br />
              Your One-Stop Portal for News, Data & Notes
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Stay informed with curated news from multiple sources, detect misinformation with AI, 
              take personalized notes, and analyze news trends — all in one place.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                Explore News
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-75 dark:opacity-30 animate-pulse"></div>
            <div className="relative bg-card rounded-xl shadow-xl overflow-hidden border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="font-serif font-bold text-xl">NewsMania</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-10 bg-muted rounded-md w-3/4"></div>
                  <div className="h-32 bg-muted rounded-md"></div>
                  <div className="h-10 bg-muted rounded-md w-1/2"></div>
                  <div className="h-24 bg-muted rounded-md"></div>
                  <div className="flex space-x-2">
                    <div className="h-10 bg-primary/20 rounded-md w-24"></div>
                    <div className="h-10 bg-primary/20 rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
