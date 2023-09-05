import Wrapper from "components/Wrapper";
import ChattingRoom from "components/sn-chatting-room";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {

  return {
    // title: t("seo.title"),
  };
}

export default function Page() {
  return <ChattingRoom />;
}
