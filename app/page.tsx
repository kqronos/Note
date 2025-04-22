import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesApp from "./components/NotesApp"; // New client component

export default function Page() {
  return (
    <div>
      <Header />
      <NotesApp /> {/* Client component */}
      <Footer />
    </div>
  );
}
