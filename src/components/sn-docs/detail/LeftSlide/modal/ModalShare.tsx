/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
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
import {
  NS_COMMON,
  NS_PROJECT,
  DEFAULT_PAGING,
  DOCS_API_URL,
} from "constant/index";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEmployees } from "store/company/selectors";
import { Option } from "constant/types";
import useQueryParams from "hooks/useQueryParams";
import { Endpoint, client } from "api";
import { useAppSelector } from "store/hooks";
import { Http } from "@mui/icons-material";
import { HttpStatusCode } from "constant/enums";
import { useSnackbar } from "store/app/selectors";

interface ModalShareProps {
  setOpenShare: React.Dispatch<SetStateAction<boolean>>;
  openShare: boolean;
}

interface initType {
  people: string | number | null | undefined;
  access: string;
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
  const { initQuery, isReady, query } = useQueryParams();
  const id = useAppSelector((data) => data.doc.id);

  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values) => {
    let value: any = {
      owner: values?.people,
      perm: values?.access,
      isPublic: values?.people === "ALL",
    };

    // if (values?.people === "ALL") {
    //   value = {
    //     perm: values?.access,
    //     isPublic: values?.people === "ALL",
    //   };
    // }

    const res = await client.put(Endpoint.ADD_PERM_DOCS + id, value, {
      baseURL: "http://103.196.145.232:6813/api/v1",
    });

    if (
      res.status === HttpStatusCode.OK ||
      res.status === HttpStatusCode.CREATED
    ) {
      onAddSnackbar("Thành Công", "success");
    }
    try {
    } catch (error) {}
  };

  const init: initType = {
    people: "ALL",
    access: "FULL",
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

  const option2 = [
    {
      value: "ALL",
      label: "All employee",
    },
    ...options,
  ];
  const optionAccess = [
    {
      value: "FULL",
      label: "Full access",
    },
    {
      value: "VIEW",
      label: "Can view",
    },
    {
      value: "EDIT",
      label: "Can edit",
    },
    {
      value: "COMMENT",
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
      onSubmit={formik.handleSubmit}
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
