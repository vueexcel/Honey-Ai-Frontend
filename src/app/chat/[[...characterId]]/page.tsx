import Layout from "../../../components/Layout";
import ChatInterface from "../../../components/chat/ChatInterface";
import { ChatStreamingProvider } from "@/context/ChatStreamingContext";

export default async function ChatPage({ params }: { params: Promise<{ characterId?: string[] }> }) {
  const resolvedParams = await params;
  const characterId = resolvedParams?.characterId?.[0] ?? null;
  return (
    <ChatStreamingProvider characterId={characterId}>
      <Layout>
        <ChatInterface />
      </Layout>
    </ChatStreamingProvider>
  );
}
