import AddBanner from "@/components/AddBanner";
import Layout from "../../components/Layout";
import MyAISection from "../../components/MyAISection";
import { ChatStreamingProvider } from "@/context/ChatStreamingContext";

export default function MyAIPage() {
  return (
    <ChatStreamingProvider>
      <Layout>
        <div className="block xl:hidden relative">
          <AddBanner />
        </div>
        <MyAISection />
      </Layout>
    </ChatStreamingProvider>
  );
}
