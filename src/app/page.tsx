import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import CharacterCarousel from "../components/CharacterCarousel";
import Footer from "../components/Footer";
import AddBanner from "@/components/AddBanner";
import { ChatStreamingProvider } from "@/context/ChatStreamingContext";

export default function Home() {
  return (
    <ChatStreamingProvider>
      <Layout>
        <div className="block xl:hidden relative">
          <AddBanner />
        </div>
        <HeroSection />
        <CharacterCarousel />
        <Footer />
      </Layout>
    </ChatStreamingProvider>
  );
}
