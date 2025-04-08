
export function TechStack() {
  const technologies = [
    { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" },
    { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" },
    { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png" },
    { name: "NewsAPI", icon: "https://newsapi.org/images/n-logo-border.png" },
    { name: "OpenAI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/512px-OpenAI_Logo.svg.png" },
    { name: "Recharts", icon: "https://recharts.org/static/media/logo.29a8bc46.svg" },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
          <p className="text-muted-foreground text-lg">
            Built with modern technologies to provide a fast, reliable, and feature-rich news experience.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center justify-center p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
              <img src={tech.icon} alt={tech.name} className="h-12 w-12 object-contain mb-4" />
              <span className="font-medium text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
