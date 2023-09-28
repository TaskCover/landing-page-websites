import FormLayout from "components/FormLayout";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Stack } from "@mui/material";
import { Select } from "components/shared";
import { useMemberOptions } from "store/project/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, DEFAULT_PAGING } from "constant/index";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEmployees } from "store/company/selectors";
import { Option } from "constant/types";
import useQueryParams from "hooks/useQueryParams";

interface ModalShareProps {
  setOpenShare: React.Dispatch<SetStateAction<boolean>>;
  openShare: boolean;
}

interface initType {
  people: string | number | null | undefined;
  access: number;
  email: string | number | null | undefined;
}

const ModalShare = ({ openShare, setOpenShare }: ModalShareProps) => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    pageSize,
    pageIndex,
    totalPages,
    onGetEmployees,
    onUpdateEmployee: onUpdateEmployeeAction,
    onDeleteEmployees,
  } = useEmployees();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);
  const [search, setSearch] = useState("");
  const { initQuery, isReady, query } = useQueryParams();
  const [queries, setQueries] = useState({});

  const onChangeQueries = (name: string, value: never) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {}
  };

  const init: initType = {
    people: "all",
    access: 1,
    email: "",
  };

  const formik = useFormik({
    initialValues: init as initType,
    enableReinitialize: true,
    onSubmit,
  });

  const options = items?.map((e) => ({
    value: e.id,
    label: e.fullname || "",
    avatar: e.avatar?.link || "",
    subText: e.email,
  }));

  console.log(formik.values);

  const option2 = [
    {
      value: "all",
      label: "All employee",
    },
    ...options,
  ];
  const optionAccess = [
    {
      value: 1,
      label: "Full access",
    },
    {
      value: 2,
      label: "Can view",
    },
    {
      value: 3,
      label: "Can edit",
    },
    {
      value: 4,
      label: "Can comment",
    },
  ];

  useEffect(() => {
    if (!isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetEmployees]);

  const onChangeSearch = (name: string, value?: string | number) => {
    onGetEmployees({ pageIndex: 1, pageSize: 20, [name]: value ?? "" });
  };

  return (
    <FormLayout
      open={openShare}
      onClose={() => setOpenShare(false)}
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      label={"Sharing options"}
    >
      <Stack direction={{ sm: "row" }} spacing={2}>
        <Select
          options={option2 as unknown as Option[]}
          title={"People"}
          hasAvatar
          searchProps={{
            value: "",
            placeholder: commonT("searchBy", { name: "email" }),
            name: "email",
          }}
          name="people"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.people}
          rootSx={sxConfig.input}
          fullWidth
          onChangeSearch={onChangeSearch}
          //   onEndReached={onEndReached}
        />
        <Select
          options={optionAccess}
          title={"Access"}
          name="access"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.access}
          rootSx={sxConfig.input}
          fullWidth
        />
      </Stack>
    </FormLayout>
  );
};

const sxConfig = {
  input: {
    height: 56,
  },
};

export default ModalShare;
