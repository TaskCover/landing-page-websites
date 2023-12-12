import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TableRow,
  TextField,
  Theme,
  selectClasses,
} from "@mui/material";
import { Date, Dropdown } from "components/Filters";
import Link from "components/Link";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { DatePicker, IconButton, Input, Text } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import EditIcon from "icons/EditIcon";
import PencilUnderlineIcon from "icons/PencilUnderlineIcon";
import PlusIcon from "icons/PlusIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useState } from "react";
import BillModal from "../components/BillModal";
import { Billing, BillingDataUpdate, Service } from "store/billing/reducer";
import TableLInkBudget from "./TableLinkBudget";
import TableService from "./TableService";
import { User } from "constant/types";
import { useFormik } from "formik";

type TabProps = {
  title: string;
  editForm?: boolean;
  item?: Billing;
  arrService?: Service[];
  user?: User;
};
const billingFormTranslatePrefix = "list.form";

const TabInvoice = (props: TabProps) => {
  const { title, editForm, arrService, item, user } = props;
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);
  const [customServices, setCustomService] = useState<Service[]>([]);
  const [arrLinkBudget, setArrLinkBudget] = useState<Service[]>([]);

  const formik = useFormik<Billing>({
    enableReinitialize: true,
    initialValues: {},
    onSubmit(values, formikHelpers) {},
  });

  useEffect(() => {
    formik.setValues(item ?? {});
  }, [item]);

  console.log(formik?.values);

  return (
    <Box>
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button variant="outlined">Sent to client</Button>
        <Stack direction={"row"} gap={2}>
          <Dropdown
            placeholder={"Invoice PDF"}
            options={[]}
            name="Tag"
            onChange={() => {}}
            // value={queries?.status}
            rootSx={{
              px: "0px!important",
              [`& .${selectClasses.outlined}`]: {
                pr: "0!important",
                mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                  `${spacing(4)}!important`,
                "& .sub": {
                  display: "none",
                },
              },
            }}
          />
          <Date
            label={"Date send"}
            onChange={function (
              name: string,
              newDate?: string | undefined,
            ): void {
              throw new Error("Function not implemented.");
            }}
            name={""}
          />
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        gap={2}
        // justifyContent={"space-between"}
        // alignItems={"center"}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4} my={2}>
            <Box sx={{ border: "1px solid #ECECF3", p: 2, borderRadius: 4 }}>
              <Stack direction={"row"} gap={2} pb={1}>
                <Input
                  title={"Invoice number"}
                  name="description"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.description}
                  // error={commonT(touchedErrors?.description, {
                  //   name: commonT("form.title.description"),
                  // })}
                  fullWidth
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
                <Input
                  title={"PO Number"}
                  name="description"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.description}
                  // error={commonT(touchedErrors?.description, {
                  //   name: commonT("form.title.description"),
                  // })}
                  fullWidth
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
              </Stack>
              <Stack direction={"row"} gap={2} pb={1}>
                <DatePicker
                  title={"Invoice date"}
                  name="end_date"
                  onChange={() => null}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.end_date}
                  // error={commonT(touchedErrors?.end_date, {
                  //   name: commonT("form.title.endDate"),
                  //   name2: commonT("form.title.startDate"),
                  // })}
                  rootSx={sxConfig.input}
                  fullWidth
                  // sx={{
                  //   mt: { xs: 2, sm: 0 },
                  // }}
                />
                <DatePicker
                  title={"Due date"}
                  name="end_date"
                  onChange={() => null}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.end_date}
                  // error={commonT(touchedErrors?.end_date, {
                  //   name: commonT("form.title.endDate"),
                  //   name2: commonT("form.title.startDate"),
                  // })}
                  rootSx={sxConfig.input}
                  fullWidth
                  // sx={{
                  //   mt: { xs: 2, sm: 0 },
                  // }}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <Input
                  title={"Subject"}
                  name="description"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.description}
                  // error={commonT(touchedErrors?.description, {
                  //   name: commonT("form.title.description"),
                  // })}
                  fullWidth
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4} my={2}>
            <Box sx={{ border: "1px solid #ECECF3", p: 2, borderRadius: 4 }}>
              <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
                <Text variant={"body1"}>Bill To</Text>
                {editForm && (
                  <Link
                    href={""}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                    }}
                  >
                    <PencilUnderlineIcon sx={{ color: "#1BC5BD", mr: 1 }} />
                    <Text variant={"body1"} color={"#1BC5BD"}>
                      Edit
                    </Text>
                  </Link>
                )}
              </Stack>
              <Stack gap={2} justifyContent={"start"} mt={3}>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4} my={2}>
            <Box sx={{ border: "1px solid #ECECF3", p: 2, borderRadius: 4 }}>
              <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
                <Text variant={"body1"}>Bill From</Text>
                {editForm && (
                  <Link
                    href={""}
                    sx={{ textDecoration: "none", display: "flex" }}
                  >
                    <PencilUnderlineIcon sx={{ color: "#1BC5BD", mr: 1 }} />
                    <Text variant={"body1"} color={"#1BC5BD"}>
                      Edit
                    </Text>
                  </Link>
                )}
              </Stack>
              <Stack gap={2} justifyContent={"start"} mt={3}>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
                <Text variant={"body1"}>Edit</Text>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack gap={2} borderBottom={"1px solid #ECECF3"} pb={2}>
        <TableService />
        {editForm && (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
              <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
              <Text variant={"body1"} color={"#1BC5BD"}>
                Add new row
              </Text>
            </Link>
          </Stack>
        )}
      </Stack>
      <Stack alignItems="start" gap={1} my={2}>
        <Stack direction="row" gap={2}>
          <Text variant={"body1"}>
            {billingT(`${billingFormTranslatePrefix}.title.subTotal`)}
          </Text>
          <Text variant={"body1"} ml={2}>
            $2.940,00
          </Text>
        </Stack>
        <Stack direction="row" gap={2}>
          <Text variant={"body1"}>
            {billingT(`${billingFormTranslatePrefix}.title.vat`) + " 0%"}
          </Text>
          <Text variant={"body1"} ml={9.7}>
            $00
          </Text>
          {editForm && (
            <Text variant={"body1"} color={"#1BC5BD"}>
              Edit
            </Text>
          )}
        </Stack>
        <Stack direction="row" gap={2}>
          <Text variant={"body1"}>
            {billingT(`${billingFormTranslatePrefix}.title.total`)}
          </Text>
          <Text variant={"body1"} ml={1.5}>
            $2.940,00
          </Text>
        </Stack>
      </Stack>
      <Stack gap={2} pb={2}>
        <TableLInkBudget />
        {editForm && (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
              <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
              <Text variant={"body1"} color={"#1BC5BD"}>
                Link budget
              </Text>
            </Link>
          </Stack>
        )}
      </Stack>
      <Stack gap={2} pb={2}>
        <Input
          title={"Field"}
          name="description"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values?.description}
          // error={commonT(touchedErrors?.description, {
          //   name: commonT("form.title.description"),
          // })}
          fullWidth
          rootSx={sxConfig.input}
          sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
        />
      </Stack>
      <BillModal />
    </Box>
  );
};

const sxConfig = {
  input: {
    height: 56,
  },
};

export default memo(TabInvoice);
