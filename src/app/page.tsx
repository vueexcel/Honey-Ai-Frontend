import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import CharacterCarousel from "../components/CharacterCarousel";
import Features from "../components/Features";
import Footer from "../components/Footer";
import AddBanner from "@/components/AddBanner";
// import Banner from "../components/Banner";

export default function Home() {
  return (
    <Layout>
      <div className="block lg:hidden">
      <AddBanner />
      </div>
      <HeroSection />
      <CharacterCarousel />
      {/* <Banner /> */}
      {/* <Features /> */}
      <Footer />
    </Layout>
  );
}
