
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { checkFactWithAI } from "@/lib/api";
import { NewsArticle } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FactCheckDialogProps {
  article: NewsArticle;
}

interface FactCheckResult {
  analysis: string;
  credibilityScore: number; // 0-100 percentage
}

export function FactCheckDialog({ article }: FactCheckDialogProps) {
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const [isFactCheckLoading, setIsFactCheckLoading] = useState(false);

  const handleFactCheck = async () => {
    setIsFactCheckLoading(true);
    setFactCheckResult(null);
    
    try {
      // Combine title and description for better context
      const textToCheck = `Headline: ${article.title}\n${article.description || ""}`;
      const result = await checkFactWithAI(textToCheck);
      
      // Parse the result from the API to extract the credibility score
      // The API now returns JSON with analysis and credibilityScore
      setFactCheckResult(result);
    } catch (error) {
      console.error("Error during fact check:", error);
      toast.error("Failed to perform fact check. Please try again.");
    } finally {
      setIsFactCheckLoading(false);
    }
  };

  const getCredibilityLabel = (score: number) => {
    if (score >= 80) return "Highly Credible";
    if (score >= 60) return "Mostly Credible";
    if (score >= 40) return "Uncertain Credibility";
    if (score >= 20) return "Questionable";
    return "Likely False";
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-green-300";
    if (score >= 40) return "bg-yellow-400";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  // Create a custom Progress component with the correct background color based on score
  const CredibilityProgress = ({ score }: { score: number }) => (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div 
        className={cn("absolute h-full transition-all", getCredibilityColor(score))}
        style={{ width: `${score}%` }}
      />
    </div>
  );

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>AI Fact Check</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <h4 className="font-medium mb-2">Checking: {article.title}</h4>
          <p className="text-sm text-muted-foreground">
            Our AI will analyze this article for potential misinformation.
          </p>
        </div>
        
        {!factCheckResult && (
          <Button onClick={handleFactCheck} disabled={isFactCheckLoading}>
            {isFactCheckLoading ? "Checking..." : "Start Fact Check"}
          </Button>
        )}
        
        {factCheckResult && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Credibility Score: {factCheckResult.credibilityScore}%</span>
                <span className="text-sm">{getCredibilityLabel(factCheckResult.credibilityScore)}</span>
              </div>
              <CredibilityProgress score={factCheckResult.credibilityScore} />
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Fact Check Result:</h4>
              <p className="text-sm whitespace-pre-line">{factCheckResult.analysis}</p>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
