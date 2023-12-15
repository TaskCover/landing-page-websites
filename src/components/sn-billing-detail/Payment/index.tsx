import { Box, Menu, MenuItem, Stack, TableRow } from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { IconButton } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import { memo, useMemo, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PencilUnderlineIcon from "icons/PencilUnderlineIcon";
import TrashIcon from "icons/TrashIcon";
import PaymentModal from "../components/PaymentModal";
import PaymentTableHome from "./PaymentTableHome";
import PaymentTable from "./PaymentTable";

type TabProps = {
  title: string;
};

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

const TabPayment = (props: TabProps) => {
  const { title } = props;

  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Stack gap={2} borderBottom={"1px solid #ECECF3"} pb={2}>
        <PaymentTableHome />
      </Stack>
      <Stack gap={2} borderBottom={"1px solid #ECECF3"} pb={2}>
        <PaymentTable handleOpen={handleOpen} />
      </Stack>
      <PaymentModal open={isOpen} handleClose={handleClose} />
    </Box>
  );
};
export default memo(TabPayment);
