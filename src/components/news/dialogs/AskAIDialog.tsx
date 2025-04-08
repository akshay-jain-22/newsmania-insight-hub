
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { askAIAboutArticle } from "@/lib/api";
import { NewsArticle } from "@/lib/api";

interface AskAIDialogProps {
  article: NewsArticle;
}

export function AskAIDialog({ article }: AskAIDialogProps) {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiResponseLoading, setIsAiResponseLoading] = useState(false);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsAiResponseLoading(true);
    setAiResponse(null);
    
    try {
      const response = await askAIAboutArticle(article, aiQuestion);
      setAiResponse(response);
    } catch (error) {
      console.error("Error asking AI:", error);
      toast.error("Failed to get an AI response. Please try again.");
    } finally {
      setIsAiResponseLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Ask AI About This Article</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <h4 className="font-medium mb-2 text-sm">Article: {article.title}</h4>
          <Textarea
            placeholder="Ask a question about this article..."
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
          />
        </div>
        <Button onClick={handleAskAI} disabled={isAiResponseLoading}>
          {isAiResponseLoading ? "Getting Response..." : "Ask AI"}
        </Button>
        
        {aiResponse && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">AI Response:</h4>
            <p className="text-sm whitespace-pre-line">{aiResponse}</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
