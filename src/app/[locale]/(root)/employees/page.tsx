import { Actions, ItemList, Wrapper } from "components/sn-employees";
import { NS_COMPANY } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_COMPANY);

  return {
    title: t("employees.head.title"),
  };
}

export default function Page() {
  return (
    <Wrapper>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
