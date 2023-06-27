import Wrapper from "components/Wrapper";
import { Actions, ItemList } from "components/sn-project-detail/Tasks";
import { NS_PROJECT, SCROLL_ID } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_PROJECT);

  return {
    title: t("detailTasks.head.title"),
  };
}

export default function Page() {
  return (
    <Wrapper sx={{ overflowX: "hidden", overflowY: "auto" }} id={SCROLL_ID}>
      <Actions />
      <ItemList />
    </Wrapper>
  );
}
