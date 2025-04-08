
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact as ContactComponent } from "@/components/Contact";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ContactComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
