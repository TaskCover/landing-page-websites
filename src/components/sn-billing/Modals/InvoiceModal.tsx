import {
  Box,
  Button,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import FormLayout from "components/FormLayout";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { NS_BILLING, NS_COMMON, NS_SALES, SALE_API_URL } from "constant/index";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, Text } from "components/shared";
import axios from "axios";
import { Endpoint, client } from "api";
import FileSaver from "file-saver";
import StepForm from "../components/StepForm";
import Avatar from "components/Avatar";
import PlusIcon from "icons/PlusIcon";
import { CellProps, TableLayout } from "components/Table";
import useBreakpoint from "hooks/useBreakpoint";
// import useExportDeal from "../hooks/useExportDeal";

interface IProps {
  open: boolean;
  onClose(): void;
}

const billingFormTranslatePrefix = "list.form";

const InvoiceModal = ({ open, onClose }: IProps) => {
  //create form
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);
  const { isMdSmaller } = useBreakpoint();
  //   const { exportDeal, isFetching } = useExportDeal();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const steps = [
    billingT(`${billingFormTranslatePrefix}.step.title.budgets`),
    billingT(`${billingFormTranslatePrefix}.step.title.preview`),
  ];

  const schema = yup.object().shape({
    type: yup.string(),
  });

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      type: "xlsx",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    // return await exportDeal().then(() => {
    //   onClose();
    // });
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: "#", width: "5%", align: "center" },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.name`),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.project`),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.status`),
        width: "15%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.revenue`),
        width: "15%",
      },
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_1.for_invoicing`,
        ),
        width: "15%",
      },
    ],
    [billingT],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      { value: "#", width: "5%", align: "center" },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.name`),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.project`),
        width: "20%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.status`),
        width: "15%",
        align: "left",
      },
      {
        value: billingT(`${billingFormTranslatePrefix}.table_step_1.revenue`),
        width: "15%",
      },
      {
        value: billingT(
          `${billingFormTranslatePrefix}.table_step_1.for_invoicing`,
        ),
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

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: "80%" },
        maxWidth: { xs: "calc(100vw - 24px)", sm: "80%" },
        minHeight: "auto",
      }}
      open={open}
      renderHeader={
        <>
          <StepForm
            listSteps={steps}
            activeStep={activeStep}
            skipped={skipped}
          />
        </>
      }
      // submitText={billingT(`${billingFormTranslatePrefix}.button.export`)}
      //   cancelText={commonT("form.cancel")}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      renderBottom={null}
      //   submitting={isFetching}
    >
      <Stack gap={2} direction="column" sx={{ mb: 4 }}>
        {activeStep === steps?.length ? (
          <Button onClick={handleBack}>Back</Button>
        ) : (
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
                <Text variant={"h3"}>
                  {billingT(
                    `${billingFormTranslatePrefix}.content.step1.content1`,
                  )}
                </Text>
                <Text variant={"body1"}>
                  {billingT(
                    `${billingFormTranslatePrefix}.content.step1.content2`,
                  )}
                </Text>
              </Stack>
              <Stack direction="row" gap={2}>
                <Avatar
                  size={32}
                  // src={item.avatar?.link ?? ProjectPlaceholderImage}
                />
                <Text variant={"body1"}>
                  {billingT(
                    `${billingFormTranslatePrefix}.content.step1.companyName`,
                  )}
                </Text>
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
                <Text variant={"body1"}>
                  {billingT(`${billingFormTranslatePrefix}.title.for_invoice`)}
                </Text>
                <TextField
                  // label="With normal TextField"
                  // id="filled-start-adornment"
                  size="small"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">USD</InputAdornment>
                    ),
                  }}
                  variant="filled"
                />
                <Stack direction="row" alignItems="center" mt={0.5} gap={2}>
                  <PlusIcon
                    sx={{
                      display: { xs: "none", md: "block" },
                      alignItems: "center",
                      width: 18,
                      height: 18,
                      color: "#1BC5BD",
                    }}
                  />
                  <Text
                    sx={{ display: { xs: "none", md: "block" } }}
                    color="#1BC5BD"
                  >
                    {billingT(`${billingFormTranslatePrefix}.filter.add`)}
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={handleNext}>
                  {billingT(`${billingFormTranslatePrefix}.button.nextStep`)}
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              // alignItems="center"
              // justifyContent="space-between"

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
                {/* {items.map((item, index) => { */}
                {/* return ( */}
                <TableRow
                // key={item.id}
                >
                  {/* {isMdSmaller ? (
                  <MobileContentCell 
                  />
                ) : ( */}
                  {/* <DesktopCells
                    order={0} // item={item}
                    // order={(pageIndex - 1) * pageSize + (index + 1)}
                  /> */}
                  {/* )} */}
                  {/* <BodyCell align="left" sx={{ px: { xs: 0.5, md: 2 } }}>
                  <IconButton
                    onClick={onActionToItem(DataAction.UPDATE, item)}
                    tooltip={commonT("edit")}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: isDarkMode ? "grey.50" : "primary.light",
                      color: "text.primary",
                      p: { xs: "4px!important", md: 1 },
                      "&:hover svg": {
                        color: "common.white",
                      },
                    }}
                  >
                    <PencilUnderlineIcon sx={{ fontSize: 24 }} />
                  </IconButton>
                </BodyCell> */}
                </TableRow>
                {/* ); */}
                {/* })} */}
              </TableLayout>
            </Stack>
          </Box>
        )}
      </Stack>
    </FormLayout>
  );
};

export default memo(InvoiceModal);
