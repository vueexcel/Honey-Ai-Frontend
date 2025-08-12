import AddBanner from "@/components/AddBanner";
import Layout from "../../components/Layout";
import MyAISection from "../../components/MyAISection";

export default function MyAIPage() {
  return (
    <Layout>
      <div className="block xl:hidden relative">
        <AddBanner />
      </div>
      <MyAISection />
    </Layout>
  );
}
