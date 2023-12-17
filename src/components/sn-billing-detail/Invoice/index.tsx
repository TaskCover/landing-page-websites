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
import {
  Bill,
  Billing,
  BillingDataUpdate,
  Budgets,
  Service,
} from "store/billing/reducer";
import { User } from "constant/types";
import { FormikProps, useFormik } from "formik";
import VatPopup from "../components/VatPopup";
import ServiceTable from "../components/ServiceTable";
import { useGetMemberOptions } from "components/sn-sales/hooks/useGetEmployeeOptions";
import { formatNumber, getPath } from "utils/index";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";
import LinkBudgetTable from "../components/LinkBudgetTable";
import LinkBudgetPopup from "../components/LinkBudgetPopup";
import { BILLING_EXPORT_PATH } from "constant/paths";
import { useRouter } from "next-intl/client";
import EyeIcon from "icons/EyeIcon";
import DownIcon from "components/sn-docs/news/asset/icons/DownIcon";
import DownloadIcon from "icons/DownloadIcon";
import FileGroupIcon from "icons/FileGroupIcon";
import ChangeIcon from "icons/ChangeIcon";
import { ChangeCircleOutlined } from "@mui/icons-material";

type TabProps = {
  title: string;
  editForm?: boolean;
  item?: Billing;
  arrService?: Service[];
  user?: User;
  arrBudgets?: Budgets[];
  form: FormikProps<Billing>;
  billToInfo: Bill;
  setBillToInfo: (value: Bill) => void;
};
const billingFormTranslatePrefix = "list.form";

const options = [
  {
    label: (
      <Stack gap={2} alignItems={"center"} direction={"row"}>
        <EyeIcon sx={{ fontSize: 20 }} />
        <Text>View PDF</Text>
      </Stack>
    ),
    value: "VIEW",
  },
  {
    label: (
      <Stack gap={2} alignItems={"center"} direction={"row"}>
        <DownloadIcon sx={{ fontSize: 20 }} />
        <Text>Download</Text>
      </Stack>
    ),
    value: "DOWNLOAD",
  },
  {
    label: (
      <Stack gap={2} alignItems={"center"} direction={"row"}>
        <ChangeCircleOutlined sx={{ fontSize: 20 }} />
        <Text>Replace</Text>
      </Stack>
    ),
    value: "REPLACE",
  },
];

const TabInvoice = (props: TabProps) => {
  const {
    title,
    editForm,
    arrService,
    item,
    user,
    arrBudgets,
    form,
    billToInfo,
    setBillToInfo,
  } = props;
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);
  const { push } = useRouter();
  const [customServices, setCustomService] = useState<Service[]>([]);
  const [arrLinkBudget, setArrLinkBudget] = useState<Service[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isBillTo, setIsBillTo] = useState<boolean>(false);
  const [billFromInfo, setBillFromInfo] = useState<Bill>({
    fullNameCompany: user?.company,
  });
  const [listService, setListService] = useState<Service[]>([]);
  const [selected, setSelected] = useState<string>("");

  // const formik = useFormik<Billing>({
  //   enableReinitialize: true,
  //   initialValues: {},
  //   onSubmit(values, formikHelpers) {
  //     // setDataUpdate

  //     return;
  //   },
  // });

  // useEffect(() => {
  //   formik.setValues(item ?? {});
  // }, [item]);

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (arrService && arrService?.length > 0) {
      setListService([...arrService]);
    }
  }, [arrService]);

  const totalAmount = useMemo(() => {
    const result = listService?.reduce((prev, item) => {
      const amount = (item as Service).price || 0;
      return prev + amount;
    }, 0);
    return result;
  }, [listService]);

  const OptionBudget = useMemo(() => {
    const options = arrBudgets?.map((item) => {
      return { label: item.name, value: item.id };
    });
    return options;
  }, [arrBudgets]);

  // const onChangeVat = () => {};
  // const onChangeBill = () => {};
  useEffect(() => {
    if (listService) {
      form.setFieldValue("budgetService", listService);
    }
  }, [billToInfo, listService]);

  useEffect(() => {
    if (totalAmount && totalAmount != 0 && form?.values?.vat) {
      form.setFieldValue(
        "amount",
        form?.values?.vat !== 0 ? totalAmount + form?.values?.vat : totalAmount,
      );
      form.setFieldValue("amount_unpaid", totalAmount);
    }
  }, [totalAmount, form?.values?.vat]);

  const onchangePdf = (value) => {
    setSelected(value);
    if (value === "VIEW") {
      push(getPath(BILLING_EXPORT_PATH, undefined, { id: item?.id ?? "" }));
    }
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"sticky"}
        // display={"unset"}
        top={0}
        zIndex={1}
      >
        <Button variant="outlined">Sent to client</Button>
        <Stack direction={"row"} gap={2}>
          <Dropdown
            placeholder={"Invoice PDF"}
            options={options ?? []}
            name="Tag"
            onChange={(name, value) => onchangePdf(value)}
            value={selected}
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
                  name="invoiceNumber"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values?.invoiceNumber}
                  disabled={!editForm}
                  // error={commonT(touchedErrors?.description, {
                  //   name: commonT("form.title.description"),
                  // })}
                  fullWidth
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
                <Input
                  title={"PO Number"}
                  name="poNumber"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values?.poNumber}
                  disabled={!editForm}
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
                  name="date"
                  onChange={() => null}
                  onBlur={form.handleBlur}
                  value={form.values?.date}
                  disabled={!editForm}
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
                  name="dueDate"
                  onChange={() => null}
                  onBlur={form.handleBlur}
                  value={form.values?.dueDate}
                  disabled={!editForm}
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
                  name="subject"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values?.subject}
                  disabled={!editForm}
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
            <Box
              sx={{
                border: "1px solid #ECECF3",
                p: 2,
                borderRadius: 4,
                height: 230,
              }}
            >
              <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
                <Text variant={"body2"}>Bill To</Text>
                {editForm && (
                  <Link
                    href={""}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                    }}
                    onClick={() => {
                      setOpenModal(true);
                      setIsBillTo(true);
                    }}
                  >
                    <PencilUnderlineIcon sx={{ color: "#1BC5BD", mr: 1 }} />
                    <Text variant={"body2"} color={"#1BC5BD"}>
                      Edit
                    </Text>
                  </Link>
                )}
              </Stack>
              <Stack gap={2} justifyContent={"start"} mt={3}>
                <Text variant={"body2"}>{billToInfo.fullNameCompany}</Text>
                <Text variant={"body2"}>{billToInfo.street}</Text>
                <Text variant={"body2"}>
                  {billToInfo.city || billToInfo.state || billToInfo.country
                    ? billToInfo.city +
                      ", " +
                      billToInfo.state +
                      ", " +
                      billToInfo.country
                    : ""}
                </Text>
                <Text variant={"body2"}>{billToInfo.taxId}</Text>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4} my={2}>
            <Box
              sx={{
                border: "1px solid #ECECF3",
                p: 2,
                borderRadius: 4,
                height: 230,
              }}
            >
              <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
                <Text variant={"body2"}>Bill From</Text>
                {editForm && (
                  <Link
                    href={""}
                    sx={{ textDecoration: "none", display: "flex" }}
                    onClick={() => {
                      setOpenModal(true);
                      setIsBillTo(false);
                    }}
                  >
                    <PencilUnderlineIcon sx={{ color: "#1BC5BD", mr: 1 }} />
                    {/* <Text variant={"body2"} color={"#1BC5BD"}>
                      Edit
                    </Text> */}
                  </Link>
                )}
              </Stack>
              <Stack gap={2} justifyContent={"start"} mt={3}>
                <Text variant={"body2"}>
                  {billFromInfo.fullNameCompany ?? ""}
                </Text>
                <Text variant={"body2"}>{billFromInfo.street ?? ""}</Text>
                <Text variant={"body2"}>
                  {billFromInfo.city ||
                  billFromInfo.state ||
                  billFromInfo.country
                    ? billFromInfo.city +
                      ", " +
                      billFromInfo.state +
                      ", " +
                      billFromInfo.country
                    : ""}
                </Text>
                <Text variant={"body2"}>{billFromInfo.taxId ?? ""}</Text>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack gap={2}>
        {/* <TableService /> */}
        <ServiceTable
          isEdit={editForm}
          listService={listService}
          setListService={setListService}
          OptionBudget={OptionBudget}
        />
      </Stack>
      <Stack alignItems="start" gap={2} pb={2}>
        <Grid container spacing={2} paddingTop={2} paddingLeft={2}>
          <Grid xs={1} md={1}>
            <Text variant={"body2"}>{"SubTotal"}</Text>
          </Grid>
          <Grid xs={2} md={2}>
            <Text variant={"body2"}>
              {formatNumber(totalAmount, {
                prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
                numberOfFixed: 2,
              })}
            </Text>
          </Grid>
        </Grid>

        <Grid container spacing={2} paddingTop={2} paddingLeft={2}>
          <Grid xs={1} md={1}>
            <Text variant={"body2"}>
              {billingT(`${billingFormTranslatePrefix}.title.vat`) + " 0%"}
            </Text>
          </Grid>
          <Grid xs={2} md={2}>
            <Text variant={"body2"}>
              {formatNumber(form?.values?.vat, {
                prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
                numberOfFixed: 2,
              })}
            </Text>
          </Grid>
          {editForm && <VatPopup form={form} />}
        </Grid>

        <Grid container spacing={2} paddingTop={2} paddingLeft={2}>
          <Grid xs={1} md={1}>
            <Text variant={"body2"}>{"Total"}</Text>
          </Grid>
          <Grid xs={2} md={2}>
            <Text variant={"body2"}>
              {formatNumber(
                form.values.vat && form.values.vat != 0
                  ? totalAmount + form.values.vat
                  : totalAmount,
                {
                  prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
                  numberOfFixed: 2,
                },
              )}
            </Text>
          </Grid>
        </Grid>
      </Stack>
      <Stack gap={2} pb={2}>
        <LinkBudgetTable
          arrBudgets={arrBudgets ?? []}
          isEdit={editForm}
          item={item}
        />
      </Stack>
      <Stack gap={2} pb={2}>
        <Input
          title={"The message displayed on the invoice"}
          name="message"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values?.message}
          // error={commonT(touchedErrors?.description, {
          //   name: commonT("form.title.description"),
          // })}
          fullWidth
          rootSx={sxConfig.input}
          sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
        />
      </Stack>
      <BillModal
        open={openModal}
        handleClose={handleClose}
        isBillTo={isBillTo}
        billTo={billToInfo}
        billFrom={billFromInfo}
        setBillToInfo={setBillToInfo}
        setBillFromInfo={setBillFromInfo}
      />
    </Box>
  );
};

const sxConfig = {
  input: {
    height: 56,
  },
};

export default memo(TabInvoice);
