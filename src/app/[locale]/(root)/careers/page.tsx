import Wrapper from "components/Wrapper";
import CareersPage from "components/sn-careers";
import DetailCareersPage from "components/sn-careers/detail-career";
import { NS_CAREER } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations(NS_CAREER);
    return {
        title: t("career.head.title"),
    };
}
export default function Page() {
    return (
        <CareersPage />
    );
}