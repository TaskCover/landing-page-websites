import SignupPage from "components/sn-signup";
import { NS_AUTH } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_AUTH);

  return {
    title: t("signup.head.title"),
  };
}

export default function Page() {
  return <SignupPage />;
}
