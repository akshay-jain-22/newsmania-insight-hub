
import { FileText, Clock, Database, MessageSquare, User, Shield } from "lucide-react";

export function Features() {
  return (
    <div className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground text-lg">
            Discover how NewsMania helps you stay informed, analyze news, and keep track of what matters most to you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <Clock className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Real-time News Feed</h3>
            <p className="text-muted-foreground">
              Stay up-to-date with the latest news from multiple sources, categorized by topics and updated hourly.
            </p>
          </div>
          
          <div className="feature-card">
            <Database className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Data Insights</h3>
            <p className="text-muted-foreground">
              Visualize news trends and patterns with interactive charts and analytics to gain deeper insights.
            </p>
          </div>
          
          <div className="feature-card">
            <FileText className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Notes & Annotations</h3>
            <p className="text-muted-foreground">
              Create, edit, and organize your personal notes linked to specific articles or topics.
            </p>
          </div>
          
          <div className="feature-card">
            <User className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Personalized Dashboard</h3>
            <p className="text-muted-foreground">
              Get news recommendations based on your interests and reading history for a tailored experience.
            </p>
          </div>
          
          <div className="feature-card">
            <MessageSquare className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Ask AI</h3>
            <p className="text-muted-foreground">
              Ask questions about any article to get deeper insights, explanations, and context from our AI assistant.
            </p>
          </div>
          
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3 className="font-serif font-bold text-xl mb-2">Rumor Detection</h3>
            <p className="text-muted-foreground">
              Verify the credibility of news articles with our AI-powered fact-checking technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
