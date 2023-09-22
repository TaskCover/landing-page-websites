import Wrapper from "components/Wrapper";
import { Actions, ItemList } from "components/sn-docs";
import DocDetail from "components/sn-docs/detail/DocDetail";
import HeaderDocDetail from "components/sn-docs/detail/HeaderDocDetail";
import { NS_DOCS } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_DOCS);

  return {
    title: t("title"),
  };
}

export default function Page() {
  return (
    <Wrapper>
      <HeaderDocDetail></HeaderDocDetail>
      <DocDetail></DocDetail>
    </Wrapper>
  );
}
