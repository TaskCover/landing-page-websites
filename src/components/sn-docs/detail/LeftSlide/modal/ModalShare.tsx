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

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {}
  };

  const init: initType = {
    people: "",
    access: 0,
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

  useEffect(() => {
    if (!isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetEmployees]);

  console.log(options);

  return (
    <FormLayout
      open={openShare}
      onClose={() => setOpenShare(false)}
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      label={"Sharing options"}
    >
      <Stack direction={{ sm: "row" }} spacing={2}>
        <Select
          options={options as unknown as Option[]}
          title={"People"}
          hasAvatar
          searchProps={{
            value: "",
            placeholder: commonT("searchBy", { name: "email" }),
            name: "members.email",
          }}
          name="people"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.people}
          rootSx={sxConfig.input}
          fullWidth
          //   onChangeSearch={onChangeSearch}
          //   onEndReached={onEndReached}
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
