import { memo } from "react";
import PopoverLayout from "./PopoverLayout";
import { Input, Text } from "components/shared";
import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { Billing } from "store/billing/reducer";
import { formatNumber } from "utils/index";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";

type IProps = {
  form: FormikProps<Billing>;
};
const VatPopup = (props: IProps) => {
  const { form } = props;
  return (
    <>
      <PopoverLayout
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
            <Stack direction={"row"} gap={2} p={2}>
              <Input
                title="name"
                value={"VAT"}
                disabled
                rootSx={sxConfig.input}
                fullWidth
              />
              <Input
                title="Value (%)"
                rootSx={sxConfig.input}
                fullWidth
                name="vat"
                value={formatNumber(form.values.vat, {
                  prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
                  numberOfFixed: 2,
                })}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Stack>
          </>
        }
        label={
          <Text variant={"body1"} color={"#1BC5BD"}>
            Edit
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
export default memo(VatPopup);
