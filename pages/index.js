import { Hero, Stats, About, Rarities, Features } from "../sections";

const Page = () => (
  <div className="bg-black overflow-hidden">
    <Hero />
    <Stats />
    <About />
    <Features />
    <Rarities />
  </div>
);

export default Page;
