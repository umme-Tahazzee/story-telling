
import Hero from './../components/Hero';
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
   <main className="min-h-screen max-w-7xl mx-auto bg-white text-black
    dark:bg-[#010517] dark:text-white transition-colors">
    <Navbar/>
     <Hero/>    
    </main>
  );
}
