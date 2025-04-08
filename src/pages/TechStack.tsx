
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechStack as TechStackComponent } from "@/components/TechStack";

const TechStack = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <TechStackComponent />
      </main>
      <Footer />
    </div>
  );
};

export default TechStack;
