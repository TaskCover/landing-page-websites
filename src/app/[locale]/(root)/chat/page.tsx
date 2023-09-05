import ChattingRoom from "components/sn-chatting-room";
import { NS_COMPANY } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
  };
}

export default function Page() {
  return <ChattingRoom />;
}
