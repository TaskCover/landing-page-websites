import Wrapper from "components/Wrapper";
import { Actions, ItemList } from "components/sn-blogs";
import { NS_BLOG } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations(NS_BLOG);
    return {
        title: t("blogs.head.title"),
    };
}
export default function Page() {
    return (
        <Wrapper overflow="auto">
            <Actions />
            <ItemList />
        </Wrapper>
    );
}
