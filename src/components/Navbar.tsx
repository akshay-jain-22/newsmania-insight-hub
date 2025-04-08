
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, FileText, Home, Info, Database, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-serif font-bold text-xl">NewsMania</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/tech-stack" className="text-sm font-medium hover:text-primary transition-colors">
            Tech Stack
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" className="font-medium">
            Sign In
          </Button>
          <Button className="font-medium">Sign Up</Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <Home className="h-5 w-5 text-primary" />
              <span>Home</span>
            </Link>
            <Link to="/features" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <Database className="h-5 w-5 text-primary" />
              <span>Features</span>
            </Link>
            <Link to="/tech-stack" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <Info className="h-5 w-5 text-primary" />
              <span>Tech Stack</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Contact</span>
            </Link>
            <div className="pt-4 border-t flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-center">Sign In</Button>
              <Button className="w-full justify-center">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
