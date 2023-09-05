<<<<<<< Updated upstream
=======
import Wrapper from "components/Wrapper";
>>>>>>> Stashed changes
import ChattingRoom from "components/sn-chatting-room";
import { NS_COMPANY } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
<<<<<<< Updated upstream
  const t = await getTranslations(NS_COMPANY);

  return {
    title: t("costHistory.head.title"),
  };
}

export default function Page() {
  return <ChattingRoom />;
=======
    const t = await getTranslations(NS_COMPANY);

    return {
        title: t("costHistory.head.title"),
    };
}

export default function Page() {
    return (
        <ChattingRoom />
    )
>>>>>>> Stashed changes
}
