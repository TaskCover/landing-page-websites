import LandingHomePage from "components/sn-landing-home";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { NS_AUTH } from "constant/index";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_AUTH);

  return {
    title: "Taskcover",
  };
}

export default function Page() {
  return <LandingHomePage />;
}
