import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TableRow,
  TextField,
  Theme,
  selectClasses,
} from "@mui/material";
import Avatar from "components/Avatar";
import { Dropdown } from "components/Filters";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { Checkbox, Input, Text } from "components/shared";
import { NS_BILLING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import PlusIcon from "icons/PlusIcon";
import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useBudgets } from "store/billing/selectors";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";
import TrashIcon from "icons/TrashIcon";
import { Budgets } from "store/billing/reducer";

const billingFormTranslatePrefix = "list.form";
type IProps = {
  isMdSmaller: boolean;
  handleNext: (value: Budgets[]) => void;
};
const FormStepOne = (props: IProps) => {
  const {
    budgets,
    pageSize,
    pageIndex,
    status,
    totalPages,
    totalItems,
    isFetching,
    isIdle,
    error,
    onGetBudgets,
  } = useBudgets();

  const { handleNext, isMdSmaller } = props;
  const billingT = useTranslations(NS_BILLING);
  const { initQuery, isReady, query } = useQueryParams();
  const [selectedList, setSelectedList] = useState<Budgets[]>([]);

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
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

  const onChangeAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedList(budgets ?? []);
      } else {
        setSelectedList([]);
      }
    },
    [budgets],
  );

  const isCheckedAll = useMemo(
    () =>
      Boolean(selectedList.length && selectedList.length === budgets?.length),
    [selectedList.length, budgets?.length],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? mobileHeaderList
      : desktopHeaderList;
    return [
      {
        value: <Checkbox checked={isCheckedAll} onChange={onChangeAll} />,
        width: isMdSmaller ? "10%" : "3%",
        align: "center",
      },
      ...additionalHeaderList,
      { value: "", width: "10%" },
    ] as CellProps[];
  }, [
    desktopHeaderList,
    isMdSmaller,
    mobileHeaderList,
    isCheckedAll,
    onChangeAll,
  ]);

  useEffect(() => {
    if (!isReady) return;
    onGetBudgets({ ...initQuery });
  }, [initQuery, isReady, onGetBudgets]);

  const onToggleSelect = (item: Budgets, indexSelected: number) => {
    return () => {
      if (indexSelected === -1) {
        setSelectedList((prevList) => [...prevList, item]);
      } else {
        setSelectedList((prevList) => {
          const newList = [...prevList];
          newList.splice(indexSelected, 1);
          return newList;
        });
      }
    };
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
              {billingT(`${billingFormTranslatePrefix}.content.step1.content1`)}
            </Text>
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.content.step1.content2`)}
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
          <Stack
            direction="row"
            alignItems="center"
            mt={0.5}
            gap={2}
            border={"1px solid #ECECF3"}
            borderRadius={4}
            px={1.5}
          >
            <Text variant={"body1"}>
              {billingT(`${billingFormTranslatePrefix}.title.for_invoice`)}
            </Text>
            <Dropdown
              // placeholder={commonT("status")}
              options={[]}
              name="status"
              onChange={() => {
                return null;
              }}
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
            <Input
              // title={"Field"}
              name="description"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values?.description}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              // multiline
              startNode="USD"
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
            <TrashIcon />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              onClick={() => handleNext(selectedList ?? [])}
              disabled={selectedList && selectedList?.length === 0}
            >
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
            {budgets?.map((item, index) => {
              const indexSelected = selectedList.findIndex(
                (selected) => selected?.id === item.id,
              );
              return (
                <TableRow key={item.id}>
                  <BodyCell sx={{ pl: { xs: 0.5, md: 1.5 } }}>
                    <Checkbox
                      checked={indexSelected !== -1}
                      onChange={onToggleSelect(item, indexSelected)}
                    />
                  </BodyCell>
                  {isMdSmaller ? (
                    <MobileContentCell />
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
const sxConfig = {
  input: {
    height: 32,
  },
};

export default memo(FormStepOne);
