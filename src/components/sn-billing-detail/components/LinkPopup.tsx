import { memo } from "react";
import PopoverLayout from "./PopoverLayout";
import { Button, IconButton, Input, Select, Text } from "components/shared";
import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { Billing, Service } from "store/billing/reducer";
import { formatNumber } from "utils/index";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";
import LinkBudgetIcon from "icons/LinkBudgetIcon";
import { Option } from "constant/types";

type IProps = { OptionBudget?: Option[]; service: Service };
const LinkPopup = (props: IProps) => {
  const { OptionBudget, service } = props;

  const onChangeValue = (e) => {};

  return (
    <>
      <PopoverLayout
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
            <Stack gap={2} p={2}>
              <Select
                options={OptionBudget ?? []}
                searchProps={{
                  placeholder: "Select service or expense",
                }}
                placeholder="Chọn"
                inputMode="search"
                // value={"VAT"}
                // disabled
                rootSx={sxConfig.input}
                fullWidth
              />

              <Button variant="text" sx={{ textDecoration: "none" }}>
                <Text variant={"body1"} color={"#1BC5BD"}>
                  Unlink
                </Text>
              </Button>
            </Stack>
          </>
        }
        label={
          <Text variant={"body1"} color={"#1BC5BD"}>
            <IconButton>
              <LinkBudgetIcon width={20} />
            </IconButton>
          </Text>
        }
      />
    </>
  );
};
const sxConfig = {
  input: {
    height: 56,
  },
};
export default memo(LinkPopup);
