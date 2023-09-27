import Wrapper from "components/Wrapper";
import { Actions, ItemList } from "components/sn-docs";
import DocDetail from "components/sn-docs/detail/DocDetail";
import HeaderDocDetail from "components/sn-docs/detail/HeaderDocDetail";
import { NS_DOCS } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Box } from "@mui/material";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_DOCS);

  return {
    title: t("title"),
  };
}

export default function Page() {
  return (
    <Wrapper overflow="auto" transparent>
      <Box
        sx={{
          margin: {
            sm: "24px",
            xs: "0px",
          },
        }}
      >
        <HeaderDocDetail></HeaderDocDetail>
        <DocDetail></DocDetail>
      </Box>
    </Wrapper>
  );
}
