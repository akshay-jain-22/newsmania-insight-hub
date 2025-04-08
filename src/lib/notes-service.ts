
export type Note = {
  id: string;
  articleUrl: string;
  articleTitle: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const NOTES_STORAGE_KEY = "newsmania-notes";

// Get all notes
export function getAllNotes(): Note[] {
  const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);
  if (!notesJson) return [];
  try {
    return JSON.parse(notesJson);
  } catch (error) {
    console.error("Error parsing notes from localStorage:", error);
    return [];
  }
}

// Get notes for a specific article
export function getArticleNotes(articleUrl: string): Note[] {
  return getAllNotes().filter(note => note.articleUrl === articleUrl);
}

// Add a new note
export function addNote(articleUrl: string, articleTitle: string, content: string): Note {
  const notes = getAllNotes();
  const newNote: Note = {
    id: crypto.randomUUID(),
    articleUrl,
    articleTitle,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedNotes = [newNote, ...notes];
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedNotes));
  return newNote;
}

// Update an existing note
export function updateNote(id: string, content: string): Note | null {
  const notes = getAllNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) return null;
  
  const updatedNote = {
    ...notes[noteIndex],
    content,
    updatedAt: new Date().toISOString(),
  };
  
  notes[noteIndex] = updatedNote;
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  return updatedNote;
}

// Delete a note
export function deleteNote(id: string): boolean {
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes));
  return true;
}

// Delete all notes for an article
export function deleteArticleNotes(articleUrl: string): boolean {
  const notes = getAllNotes();
  const filteredNotes = notes.filter(note => note.articleUrl !== articleUrl);
  
  if (filteredNotes.length === notes.length) return false;
  
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes));
  return true;
}
