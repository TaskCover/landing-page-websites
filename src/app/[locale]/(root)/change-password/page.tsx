import ChangePasswordPage from "components/sn-change-password";
import { NS_ACCOUNT } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_ACCOUNT);

  return {
    title: t("changePassword.head.title"),
  };
}

export default function Page() {
  return <ChangePasswordPage />;
}
