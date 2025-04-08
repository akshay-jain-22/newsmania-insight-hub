
import React, { useState } from "react";
import { ExternalLink, MessageSquare, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewsArticle } from "@/lib/api";
import { AskAIDialog } from "./dialogs/AskAIDialog";
import { FactCheckDialog } from "./dialogs/FactCheckDialog";
import { NotesDialog } from "./dialogs/NotesDialog";

interface NewsCardActionsProps {
  article: NewsArticle;
}

export function NewsCardActions({ article }: NewsCardActionsProps) {
  const [isFactCheckOpen, setIsFactCheckOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" asChild>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
          <ExternalLink className="h-4 w-4 mr-1" />
          Read More
        </a>
      </Button>
      
      {/* Ask AI Dialog */}
      <Dialog open={isAskAIOpen} onOpenChange={setIsAskAIOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Ask AI
          </Button>
        </DialogTrigger>
        <AskAIDialog article={article} />
      </Dialog>
      
      {/* Fact Check Dialog */}
      <Dialog open={isFactCheckOpen} onOpenChange={setIsFactCheckOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center">
            <FileEdit className="h-4 w-4 mr-1" />
            Fact Check
          </Button>
        </DialogTrigger>
        <FactCheckDialog article={article} />
      </Dialog>
      
      {/* Notes Dialog */}
      <Button 
        size="sm" 
        variant="outline" 
        className="flex items-center" 
        onClick={() => setIsNotesOpen(true)}
      >
        <FileEdit className="h-4 w-4 mr-1" />
        Notes
      </Button>
      
      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <NotesDialog article={article} isOpen={isNotesOpen} />
      </Dialog>
    </div>
  );
}
