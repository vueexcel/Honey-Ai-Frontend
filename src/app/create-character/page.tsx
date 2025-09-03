import CreateCharacterForm from "@/components/create-character/CreateCharacterForm";
import { Layout } from "@/components";
import { ChatStreamingProvider } from "@/context/ChatStreamingContext";

export default function CreateCharacterPage() {
  return (
    <ChatStreamingProvider>
      <Layout>
        <CreateCharacterForm />
      </Layout>
    </ChatStreamingProvider>
  );
}
