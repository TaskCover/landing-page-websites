import { Box, Button, Stack, StackProps, Tab } from "@mui/material";
import { NS_BILLING } from "constant/index";
import useTheme from "hooks/useTheme";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";

import { TabContext, TabPanel, TabList } from "@mui/lab";
import TabInvoice from "../Invoice";
import TabFeed from "../Feed";
import TabPayment from "../Payment";

type TabItemProps = {
  label: string;
  value: string;
};

const TabInfo = () => {
  // const { id } = useParams() as { id: string };
  // const pathname = usePathname();
  const [value, setValue] = useState("Invoice");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack
        // direction="row"
        // alignItems="center"
        borderBottom={{ md: "1px solid" }}
        // justifyContent="space-between"
        borderColor={{ md: "grey.100" }}
        width="100%"
        overflow="auto"
        // position="sticky"
        // top={isMembersOfProjectPath ? undefined : { xs: 8, sm: 16 }}
        bgcolor="background.paper"
        px={3}
      >
        <TabContext value={value}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={2}
            borderBottom={"1px solid #ECECF3"}
          >
            <TabList key={value} onChange={handleChange}>
              {TABS.map((tab) => (
                <Tab
                  key={tab.label}
                  {...tab}
                  label={tab.label}
                  sx={{ color: "grey.300" }}
                />
              ))}
            </TabList>
            <Stack gap={2} direction={"row"} mb={1}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save Change</Button>
            </Stack>
          </Stack>
          {TABS.map((tab) => (
            <TabItem key={tab.label} {...tab} label={tab.label} />
          ))}
          {/* <TabActions /> */}
        </TabContext>
      </Stack>
    </>
  );
};

export default memo(TabInfo);

const TabItem = (props: TabItemProps) => {
  const { label, value } = props;

  const billingT = useTranslations(NS_BILLING);
  const { isDarkMode } = useTheme();

  // const pathname = usePathname();
  // const params = useParams();

  // const isActiveLink = useMemo(() => {
  //   const suffixPath = getSuffixPath(pathname);

  //   return suffixPath;
  // }, [pathname]);

  return (
    <TabPanel
      value={value}

      // color={isActiveLink ? "text.primary" : "grey.300"}
    >
      {value === "Invoice" && <TabInvoice title={label} />}
      {value === "Feed" && <TabFeed title={label} />}
      {value === "Payment" && <TabPayment title={label} />}
    </TabPanel>
  );
};

const TABS = [
  { label: "Invoice", value: "Invoice" },
  { label: "Feed", value: "Feed" },
  { label: "Payment", value: "Payment" },
];
