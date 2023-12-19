import Wrapper from "components/Wrapper";
import UserInformationPage from "components/sn-user-information";
import { NS_ACCOUNT } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_ACCOUNT);

  return {
    title: t("accountInformation.head.title"),
  };
}
export default function Page() {
  return (
    <Wrapper overflow="auto">
      <UserInformationPage />
    </Wrapper>
  );
}
