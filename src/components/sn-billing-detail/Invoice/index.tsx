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
import { IconButton, Input, Text } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import EditIcon from "icons/EditIcon";
import PencilUnderlineIcon from "icons/PencilUnderlineIcon";
import PlusIcon from "icons/PlusIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";
import BillModal from "../components/BillModal";

type TabProps = {
  title: string;
};
const billingFormTranslatePrefix = "list.form";

const TabInvoice = (props: TabProps) => {
  const { title } = props;
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: "", width: "5%", align: "center" },
      {
        value: billingT("list.table.subject"),
        align: "left",
      },
      {
        value: billingT("list.table.invoiceNumber"),
        align: "left",
      },
      {
        value: billingT("list.table.date"),
        align: "left",
      },
      { value: billingT("list.table.budgets") },
      { value: billingT("list.table.att") },
      { value: billingT("list.table.amount") },
      { value: billingT("list.table.amountUnpaid") },
      { value: billingT("list.table.dueDate") },
    ],
    [billingT],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      { value: "", width: "5%", align: "center" },
      {
        value: billingT("list.table.subject"),
        align: "left",
      },
      {
        value: billingT("list.table.invoiceNumber"),
        align: "left",
      },
      {
        value: billingT("list.table.date"),
        align: "left",
      },
      { value: billingT("list.table.budgets") },
      { value: billingT("list.table.att") },
      { value: billingT("list.table.amount") },
      { value: billingT("list.table.amountUnpaid") },
      { value: billingT("list.table.dueDate") },
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
                  title={"Field"}
                  name="description"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values?.description}
                  // error={commonT(touchedErrors?.description, {
                  //   name: commonT("form.title.description"),
                  // })}
                  fullWidth
                  multiline
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
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
                  multiline
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
              </Stack>
              <Stack direction={"row"} gap={2} pb={1}>
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
                  multiline
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
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
                  multiline
                  rootSx={sxConfig.input}
                  sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
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
                  multiline
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

                <Link
                  href={""}
                  sx={{ textDecoration: "none", display: "flex" }}
                >
                  <PencilUnderlineIcon sx={{ color: "#1BC5BD", mr: 1 }} />
                  <Text variant={"body1"} color={"#1BC5BD"}>
                    Edit
                  </Text>
                </Link>
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
        <TableLayout
          headerList={headerList}
          // pending={isFetching}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
          // error={error as string}
          // noData={!isIdle && totalItems === 0}
          // px={{ md: 3 }}
        >
          {/* {items?.map((item, index) => {
            const indexSelected = selectedList.findIndex(
              (selected) => selected?.id === item.id,
            );
            return ( */}
          <TableRow
          // key={item?.id}
          >
            {/* <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item, indexSelected)}
                  />
                </BodyCell>
                {isMdSmaller ? (
                  <MobileContentCell />
                ) : (
                  <DesktopCells
                    item={item}
                    order={(pageIndex - 1) * pageSize + (index + 1)}
                  />
                )} */}
            <BodyCell align="left" sx={{ px: { xs: 0.5, md: 2 } }}>
              <IconButton
                // onClick={onActionToItem(DataAction.UPDATE, item)}
                tooltip={commonT("delete")}
                variant="normal"
                size="small"
                sx={{
                  // backgroundColor: isDarkMode ? "grey.50" : "primary.light",
                  color: "text.primary",
                  p: { xs: "4px!important", md: 1 },
                  "&:hover svg": {
                    color: "common.white",
                  },
                }}
              >
                <TrashIcon fontSize="small" />
              </IconButton>
            </BodyCell>
          </TableRow>
          {/* );
          })} */}
        </TableLayout>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
            <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
            <Text variant={"body1"} color={"#1BC5BD"}>
              Add new row
            </Text>
          </Link>
        </Stack>
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
          <Text variant={"body1"} color={"#1BC5BD"}>
            Edit
          </Text>
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
        <TableLayout
          headerList={headerList}
          // pending={isFetching}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
          // error={error as string}
          // noData={!isIdle && totalItems === 0}
          // px={{ md: 3 }}
        >
          {/* {items?.map((item, index) => {
            const indexSelected = selectedList.findIndex(
              (selected) => selected?.id === item.id,
            );
            return ( */}
          <TableRow
          // key={item?.id}
          >
            {/* <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item, indexSelected)}
                  />
                </BodyCell>
                {isMdSmaller ? (
                  <MobileContentCell />
                ) : (
                  <DesktopCells
                    item={item}
                    order={(pageIndex - 1) * pageSize + (index + 1)}
                  />
                )} */}
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
          {/* );
          })} */}
        </TableLayout>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
            <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
            <Text variant={"body1"} color={"#1BC5BD"}>
              Link budget
            </Text>
          </Link>
        </Stack>
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
          multiline
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
