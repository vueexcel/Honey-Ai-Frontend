import AddBanner from "@/components/AddBanner";
import Layout from "../../components/Layout";
import ProfileSettings from "@/components/settings/ProfileSettings";
export default function PricingPage() {
  return (
    <Layout>
      <div className="block xl:hidden relative">
        <AddBanner />
      </div>
      <ProfileSettings />
    </Layout>
  );
}
