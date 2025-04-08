
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addNote, getArticleNotes } from "@/lib/notes-service";
import { NewsArticle } from "@/lib/api";

interface NotesDialogProps {
  article: NewsArticle;
  isOpen: boolean;
}

export function NotesDialog({ article, isOpen }: NotesDialogProps) {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  // Load existing notes when the dialog opens
  useEffect(() => {
    if (isOpen) {
      const articleNotes = getArticleNotes(article.url);
      setNotes(articleNotes.map(note => note.content));
    }
  }, [isOpen, article.url]);

  const handleSaveNote = () => {
    if (!noteContent.trim()) {
      toast.error("Please enter a note");
      return;
    }
    
    try {
      addNote(article.url, article.title, noteContent);
      setNoteContent("");
      
      // Update notes list
      const articleNotes = getArticleNotes(article.url);
      setNotes(articleNotes.map(note => note.content));
      
      toast.success("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note. Please try again.");
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Notes for Article</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <h4 className="font-medium mb-2 text-sm">Article: {article.title}</h4>
          <Textarea
            placeholder="Add your notes here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
        
        <Button onClick={handleSaveNote}>Save Note</Button>
        
        {notes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Your Notes:</h4>
            <div className="space-y-2">
              {notes.map((note, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                  {note}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
