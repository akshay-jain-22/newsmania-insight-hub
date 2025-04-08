
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Features as FeaturesComponent } from "@/components/Features";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <FeaturesComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
