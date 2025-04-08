
import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl">NewsMania</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop portal for news, data, and notes. Stay informed, analyze trends, and keep track of what matters to you.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/tech-stack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tech Stack
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">News Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/politics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Politics
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/category/science" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link to="/category/health" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@newsmania.com" className="text-sm flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NewsMania. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
