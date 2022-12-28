import { Footer, Navbar } from "../components";
import { Hero, Stats, About, Rarities, Features } from "../sections";

const Page = () => (
  <div className="bg-black overflow-hidden">
    <Navbar />
    <Hero />
    <Stats />
    <About />
    <Features />
    <Rarities />
    <Footer />
  </div>
);

export default Page;
