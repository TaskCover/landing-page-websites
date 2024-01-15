import { NS_APPLICANTS } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DetailCareersPage from "components/sn-careers/detail-career";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_APPLICANTS);
  return {
    title: t("applicants.head.tab_title"),
  };
}

export default function Page() {
  return <DetailCareersPage />;
}
