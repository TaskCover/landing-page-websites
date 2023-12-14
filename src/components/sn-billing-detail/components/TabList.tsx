import { Box, Button, Stack, StackProps, Tab } from "@mui/material";
import { NS_BILLING } from "constant/index";
import useTheme from "hooks/useTheme";
import { useTranslations } from "next-intl";
import { memo, useEffect, useState } from "react";

import { TabContext, TabPanel, TabList } from "@mui/lab";
import TabInvoice from "../Invoice";
import TabFeed from "../Feed";
import TabPayment from "../Payment";
import {
  Bill,
  Billing,
  BillingDataUpdate,
  Budgets,
  Service,
} from "store/billing/reducer";
import { User } from "constant/types";
import { useBillings } from "store/billing/selectors";
import { FormikProps, useFormik } from "formik";

type TabItemProps = {
  label: string;
  value: string;
  editForm?: boolean;
  item?: Billing;
  arrService?: Service[];
  arrBudgets?: Budgets[];
  user?: User;
  form: FormikProps<Billing>;
  billToInfo: Bill;
  setBillToInfo: (value: Bill) => void;
};

type TabListProps = {
  item?: Billing;
  arrService?: Service[];
  arrBudgets?: Budgets[];
  user?: User;
};

const TabInfo = (props: TabListProps) => {
  const { arrService, item, user, arrBudgets } = props;
  // const { id } = useParams() as { id: string };
  // const pathname = usePathname();
  const { onUpdateBilling, updateStatus } = useBillings();
  const [value, setValue] = useState("Invoice");
  const [editForm, setEditForm] = useState<boolean>(false);
  const [billToInfo, setBillToInfo] = useState<Bill>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const formik = useFormik<Billing>({
    enableReinitialize: true,
    initialValues: {},
    onSubmit(values, formikHelpers) {
      // setDataUpdate
      const data = {
        ...values,
        ...billToInfo,
        id: item?.id,
      } as BillingDataUpdate;
      handleSaveValue(data ?? {});
      setIsSubmit(true);
    },
  });

  useEffect(() => {
    formik.setValues(item ?? {});
  }, [item]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSaveValue = (data: BillingDataUpdate) => {
    onUpdateBilling(data);
  };

  useEffect(() => {
    if (updateStatus && isSubmit) {
      formik.resetForm();
      setEditForm(false);
      setIsSubmit(false);
    }
  }, [updateStatus, isSubmit]);
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
              {!editForm && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditForm(true);
                  }}
                >
                  Edit
                </Button>
              )}

              {editForm && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                  >
                    Save Change
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
          {TABS.map((tab) => (
            <TabItem
              key={tab.label}
              {...tab}
              label={tab.label}
              editForm={editForm}
              arrService={arrService}
              item={item}
              user={user}
              arrBudgets={arrBudgets}
              form={formik}
              billToInfo={billToInfo}
              setBillToInfo={setBillToInfo}
            />
          ))}
          {/* <TabActions /> */}
        </TabContext>
      </Stack>
    </>
  );
};

export default memo(TabInfo);

const TabItem = (props: TabItemProps) => {
  const {
    label,
    value,
    editForm,
    arrService,
    item,
    user,
    arrBudgets,
    form,
    billToInfo,
    setBillToInfo,
  } = props;

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
      {value === "Invoice" && (
        <TabInvoice
          title={label}
          editForm={editForm}
          arrService={arrService}
          item={item}
          user={user}
          arrBudgets={arrBudgets}
          form={form}
          billToInfo={billToInfo}
          setBillToInfo={setBillToInfo}
        />
      )}
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
