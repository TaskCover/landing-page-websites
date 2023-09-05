import Wrapper from "components/Wrapper";
import ChattingRoom from "components/sn-chatting-room";
import { NS_CHAT } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_CHAT);

  return {
    // title: t("seo.title"),
  };
}

export default function Page() {
  return <ChattingRoom />;
}
