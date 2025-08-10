import Layout from "../../components/Layout";
import PricingSection from "../../components/PricingSection";
import FeaturedIn from "../../components/pricing/AsFeaturedIn";
import FrequentlyAskedQuestions from "@/components/pricing/FrequentlyAskedQuestion";
import FeaturedByUsers from "@/components/pricing/FeaturedByUsers";

export default function PricingPage() {
  return (
    <Layout>
      <PricingSection />
      <FeaturedIn />
      <FeaturedByUsers />
      <FrequentlyAskedQuestions />
    </Layout>
  );
}
