import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  Stack,
  TableRow,
  TextField,
  Theme,
  selectClasses,
} from "@mui/material";
import Avatar from "components/Avatar";
import { CellProps, TableLayout } from "components/Table";
import { Select, Text } from "components/shared";
import { NS_BILLING } from "constant/index";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useState } from "react";
import {
  useBillings,
  useBudgets,
  useServiceBudgets,
} from "store/billing/selectors";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { Dropdown } from "components/Filters";
import { useFormik } from "formik";

const billingFormTranslatePrefix = "list.form";

type IProps = {
  isMdSmaller?: boolean;
  handleSubmit?: () => void;
  budgetId?: string;
  setActiveStep?: (value) => void;
};
const options = [
  {
    label: "By Service",
    value: "SERVICE",
  },
  {
    label: "By Budget",
    value: "BUDGET",
  },
];

const optionsPercent = [
  {
    label: "100%",
    value: 100,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "20%",
    value: 20,
  },
];

const optionsExpresses = [
  {
    label: "Invoice",
    value: "INVOICE",
  },
  {
    label: "Other",
    value: "Other",
  },
];
const FormStepTwo = (props: IProps) => {
  const { handleSubmit, isMdSmaller, budgetId, setActiveStep } = props;

  const { arrService, onGetServiceBudgets } = useServiceBudgets();
  const { budgetDetail, onGetBudgetDetail } = useBudgets();
  const { onCreateBilling } = useBillings();
  const [checkItem, setCheckItem] = useState<string>("1");

  const billingT = useTranslations(NS_BILLING);

  const formik = useFormik({
    initialValues: {
      invoiceMethod: "",
      vat: 0,
      budgetService: [] as string[],
      subject: "",
      amount: 0,
      itemByTime: "SERVICE",
      itemByAmount: "SERVICE",
      itemBy: "SERVICE",
      itemPercent: 50,
      express: "INVOICE",
    },
    // validationSchema: {},
    onSubmit(values, formikHelpers) {
      const arrServiceId = arrService?.map((item) => item?.id);

      const data = {
        ...values,
        budgetService: arrServiceId ?? [],
        invoiceNumber: "11",
        budget: [],
        user: [],
        status: "unpaid",
      };
      delete data["express"];
      delete data["itemBy"];
      delete data["itemByAmount"];
      delete data["itemByTime"];
      delete data["itemPercent"];

      onCreateBilling(data);
      setActiveStep?.(1);
    },
  });

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_2.service_type`,
        ),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_2.description`,
        ),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.unit`),
        width: "15%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.qty`),
        width: "15%",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.rate`),
        width: "15%",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.amount`),
        width: "15%",
      },
    ],
    [billingT],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_2.service_type`,
        ),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_2.description`,
        ),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.unit`),
        width: "15%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.qty`),
        width: "15%",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.rate`),
        width: "15%",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_2.amount`),
        width: "15%",
      },
    ],
    [billingT],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? mobileHeaderList
      : desktopHeaderList;
    return [
      ...additionalHeaderList,
      { value: "", width: "10%" },
    ] as CellProps[];
  }, [desktopHeaderList, isMdSmaller, mobileHeaderList]);

  useEffect(() => {
    onGetServiceBudgets(budgetId ?? "");
  }, [onGetServiceBudgets]);

  // useEffect(() => {
  //   onGetBudgetDetail(budgetId ?? "");
  // }, [onGetBudgetDetail, budgetId]);

  const onChangeRadio = (event, value) => {
    setCheckItem(value);
    formik.setFieldValue("invoiceMethod", value);
  };

  return (
    <>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{
            md: 0,
            xs: 3,
          }}
        >
          <Stack direction="column" py={3} gap={2}>
            <Text variant={"h4"}>
              {billingT(`${billingFormTranslatePrefix}.content.step2.content1`)}
            </Text>
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.content.step2.content2`)}
            </Text>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button variant="contained" onClick={() => formik.handleSubmit()}>
              {billingT(`${billingFormTranslatePrefix}.button.submit`)}
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{
            md: 0,
            xs: 3,
          }}
        >
          <Stack direction="row" alignItems="center" mt={0.5} gap={2}>
            <RadioGroup onChange={onChangeRadio} value={checkItem}>
              <Stack gap={2} direction={"row"}>
                <Radio value={"1"} />
                <Text variant={"body1"} mt={1}>
                  {billingT(
                    `${billingFormTranslatePrefix}.title.uninvoiced_time_expenses`,
                  )}
                </Text>

                <Dropdown
                  // placeholder={commonT("status")}
                  options={options}
                  name="itemByTime"
                  onChange={(e, value) => {
                    formik.setFieldValue("itemByTime", value);
                  }}
                  defaultValue={"SERVICE"}
                  value={formik.values.itemByTime}
                  rootSx={{
                    color: "#1BC5BD",
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
              </Stack>

              <Stack gap={2} direction={"row"}>
                <Radio value={"2"} />
                <Text variant={"body1"} mt={1}>
                  {billingT(
                    `${billingFormTranslatePrefix}.title.uninvoiced_amount`,
                  )}
                </Text>

                <Dropdown
                  // placeholder={commonT("status")}
                  options={options}
                  name="itemByAmount"
                  onChange={(e, value) => {
                    formik.setFieldValue("itemByAmount", value);
                  }}
                  defaultValue={"SERVICE"}
                  value={formik.values.itemByAmount}
                  rootSx={{
                    color: "#1BC5BD",
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
              </Stack>

              <Stack gap={2} direction={"row"}>
                <Radio value={"3"} />
                <Dropdown
                  // placeholder={commonT("status")}
                  options={optionsPercent}
                  name="itemBy"
                  onChange={(e, value) => {
                    formik.setFieldValue("itemPercent", value);
                  }}
                  defaultValue={50}
                  value={formik.values.itemPercent}
                  rootSx={{
                    color: "#1BC5BD",
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
                <Text variant={"body1"} mt={1}>
                  {billingT(
                    `${billingFormTranslatePrefix}.title.of_the_budget_revenue`,
                  )}
                </Text>

                <Dropdown
                  // placeholder={commonT("status")}
                  options={options}
                  name="itemBy"
                  onChange={(e, value) => {
                    formik.setFieldValue("itemBy", value);
                  }}
                  defaultValue={"SERVICE"}
                  value={formik.values.itemBy}
                  rootSx={{
                    color: "#1BC5BD",
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
              </Stack>
            </RadioGroup>
          </Stack>
          {checkItem == "1" && (
            <Stack gap={2} mr={10}>
              <Stack gap={2}>
                <Text variant={"body1"} sx={{ color: "#666666" }}>
                  {billingT(
                    `${billingFormTranslatePrefix}.title.display_service`,
                  )}
                </Text>
                <Select
                  options={[]}
                  sx={{ width: "100%" }}
                  size="small"
                ></Select>
              </Stack>

              <Stack gap={2}>
                <Text variant={"body1"} sx={{ color: "#666666" }}>
                  {billingT(
                    `${billingFormTranslatePrefix}.title.display_expenses`,
                  )}
                </Text>
                <Select
                  options={[]}
                  sx={{ width: "100%", height: "32px" }}
                  size="small"
                ></Select>
              </Stack>
            </Stack>
          )}
        </Stack>

        <Stack
          gap={2}
          direction={"row"}
          borderBottom={"1px solid #ECECF3"}
          pb={2}
        >
          <Text variant={"body1"}>
            {billingT(`${billingFormTranslatePrefix}.title.display_expenses`)}
          </Text>
          <Dropdown
            // placeholder={commonT("status")}
            options={optionsExpresses}
            name="express"
            onChange={(e, value) => {
              formik.setFieldValue("express", value);
            }}
            defaultValue={"INVOICE"}
            value={formik.values.express}
            rootSx={{
              color: "#1BC5BD",
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
        </Stack>
        <Stack alignItems="start" gap={1}>
          <Stack direction="row" mt={2} gap={2}>
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.title.subTotal`)}
            </Text>
            <Text variant={"body1"} ml={2}>
              {"$" + formik.values.amount}
            </Text>
          </Stack>
          <Stack direction="row" gap={2}>
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.title.vat`) + " 0%"}
            </Text>
            <Text variant={"body1"} ml={3}>
              {"% " + formik.values.vat}
            </Text>
          </Stack>
          <Stack direction="row" gap={2}>
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.title.total`)}
            </Text>
            <Text variant={"body1"} ml={1.5}>
              {"$" + formik.values.amount}
            </Text>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" mt={3} gap={2}>
          <Text variant={"h4"}>
            {billingT(`${billingFormTranslatePrefix}.title.invoice_preview`)}
          </Text>
        </Stack>
        <Stack
          direction="row"
          spacing={{
            md: 0,
            xs: 3,
          }}
        >
          <TableLayout
            headerList={headerList}
            // pending={isFetching}
            width={"100%"}
            py={2}
            headerProps={{
              sx: { px: { xs: 0.5, md: 2 } },
            }}
            // error={error as string}
            // noData={!isIdle && totalItems === 0}
            px={{ md: 3 }}
          >
            {arrService?.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  {isMdSmaller ? (
                    <MobileContentCell item={item} />
                  ) : (
                    <DesktopCells
                      order={0}
                      item={item}
                      // order={(pageIndex - 1) * pageSize + (index + 1)}
                    />
                  )}
                </TableRow>
              );
            })}
          </TableLayout>
        </Stack>
      </Box>
    </>
  );
};
export default memo(FormStepTwo);
