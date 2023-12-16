import { DialogLayoutProps } from "components/DialogLayout";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { DATE_FORMAT_FORM, NS_COMMON, NS_PROJECT } from "constant/index";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import FormLayout from "components/FormLayout";
import { MenuList, Popper, Stack } from "@mui/material";
import { Input, Select } from "components/shared";
import { FormikErrors, useFormik } from "formik";
import { TBudgetCreateParam } from "store/project/budget/action";
import * as Yup from "yup";
import { useEmployeeOptions } from "store/company/selectors";
import { formatDate, getMessageErrorByAPI } from "utils/index";
import { useBudgets } from "store/project/budget/selector";
import { DateTimePicker } from "components/shared/DatePicker";
import { useProjects } from "store/project/selectors";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";

type Props = Omit<DialogLayoutProps, "children" | "onSubmit"> & {
  projectId?: string;
};

const ModalAddBudget = (props: Props) => {
  const { ...rest } = props;

  const bodyModalRef = useRef<HTMLDivElement>(null);
  const [defaultHeightBodyModal, setDefaultHeightBodyModal] =
    useState<number>(0);

  const projectId: string = props.projectId ?? "";

  const { onAddSnackbar } = useSnackbar();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);
  const projectBudget = useBudgets();

  const {
    options: employeeOptions,
    onGetOptions: onGetEmployeeOptions,
    isFetching,
    filters,
    pageSize,
    pageIndex,
    totalPages,
  } = useEmployeeOptions();

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();

  useEffect(() => {
    if (!rest.open) return;
    if (!projects || projects.length === 0) {
      onGetProjects({});
    }
  }, [rest.open]);

  useEffect(() => {
    setTimeout(() => {
      if (!bodyModalRef.current) return;
      const heightBodyModal = bodyModalRef.current?.offsetHeight ?? 0;
      setDefaultHeightBodyModal(heightBodyModal);
    }, 300);
  }, [bodyModalRef.current, rest.open]);

  const onSubmit = async (param: TBudgetCreateParam) => {
    if (param.start_date) {
      param.start_date = formatDate(param.start_date, DATE_FORMAT_FORM);
    }
    if (param.end_date) {
      param.end_date = formatDate(param.end_date, DATE_FORMAT_FORM);
    }

    try {
      await projectBudget.create(param);
      onAddSnackbar(projectT("budget.createBudgetSuccess"), "success");
      props.onClose();
      projectBudget.get();
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onChangeDate = (name: string, newDate?: Date) => {
    formik.setFieldValue(name, newDate ? newDate.getTime() : null);
    formik.setFieldTouched(name, true);
    setTimeout(() => {
      formik.validateForm();
    }, 50);
  };

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetEmployeeOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const toggleFocusInputDate = async (isFocus = false) => {
    if (window["timeoutAnimation"]) {
      clearTimeout(window["timeoutAnimation"]);
    }

    const timeAnimation: number = 300; // ms
    const timeWaitReadyElement: number = 100; //ms

    window["timeoutAnimation"] = setTimeout(() => {
      if (!bodyModalRef.current) return;

      const optAnimate = {
        duration: timeAnimation,
        easing: "ease-in-out",
        iterations: 1,
      };

      const offsetHeight = bodyModalRef.current.offsetHeight;
      const scrollHeight = bodyModalRef.current.scrollHeight;

      let fromHeight: string;
      let toHeight: string;

      if (isFocus) {
        if (offsetHeight === scrollHeight) return;
        fromHeight = defaultHeightBodyModal + "px";
        toHeight = scrollHeight + "px";
      } else {
        fromHeight = offsetHeight + "px";
        toHeight = defaultHeightBodyModal + "px";
      }

      bodyModalRef.current.animate(
        { height: [fromHeight, toHeight] },
        optAnimate,
      );

      bodyModalRef.current!.style.height = toHeight;
    }, timeWaitReadyElement);
  };

  const initialValues: TBudgetCreateParam = {
    project_id: projectId,
    name: "",
    end_date: "",
    owner: "",
    start_date: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("form.error.required"),
    owner: Yup.string().trim().required("form.error.required"),
    project_id: Yup.string().required("form.error.required"),
    start_date: Yup.number(),
    end_date: Yup.number().min(Yup.ref("start_date"), "form.error.gte"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<TBudgetCreateParam>, [key, error]) => {
        if (formik.touched[key]) {
          out[key] = error;
        }
        return out;
      },
      {},
    );
  }, [formik.touched, formik.errors]);

  const sxInput = {
    height: 58,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
  };

  return (
    <FormLayout
      label={projectT("budget.action.addBudgetTitleModal")}
      onSubmit={formik.handleSubmit}
      pending={false}
      submitWhenEnter={false}
      bodyFlex={0}
      {...rest}
    >
      <Stack overflow="auto" ref={bodyModalRef}>
        <MenuList component={Stack} spacing={2}>
          {!props.projectId && (
            <Select
              options={projectOptions}
              title={projectT("budget.form.project_id")}
              name="project_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.project_id}
              error={commonT(touchedErrors?.owner, {
                name: projectT("budget.form.project_id"),
              })}
              rootSx={sxInput}
              fullWidth
            />
          )}
          <Input
            rootSx={sxInput}
            title={projectT("budget.form.name")}
            fullWidth
            name="name"
            disabled={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.name}
            error={commonT(touchedErrors?.name, {
              name: projectT("budget.form.name"),
            })}
          />
          <Stack direction={{ sm: "row" }} spacing={2}>
            <DateTimePicker
              title={projectT("budget.form.start_date")}
              name="start_date"
              onChange={onChangeDate}
              onBlur={formik.handleBlur}
              value={formik.values?.start_date}
              error={commonT(touchedErrors?.start_date, {
                name: projectT("budget.form.start_date"),
              })}
              rootSx={sxInput}
              fullWidth
              pickerProps={{
                onFocus() {
                  toggleFocusInputDate(true);
                },
                onBlur() {
                  toggleFocusInputDate(false);
                },
                onClickOutside() {
                  toggleFocusInputDate(false);
                },
              }}
            />
            <DateTimePicker
              title={projectT("budget.form.end_date")}
              name="end_date"
              onChange={onChangeDate}
              onBlur={formik.handleBlur}
              value={formik.values?.end_date}
              error={commonT(touchedErrors?.end_date, {
                name: projectT("budget.form.end_date"),
                name2: projectT("budget.form.start_date"),
              })}
              rootSx={sxInput}
              fullWidth
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              pickerProps={{
                onFocus() {
                  toggleFocusInputDate(true);
                },
                onBlur() {
                  toggleFocusInputDate(false);
                },
                onClickOutside() {
                  toggleFocusInputDate(false);
                },
              }}
            />
          </Stack>
          <Select
            options={employeeOptions}
            title={projectT("budget.form.owner")}
            name="owner"
            hasAvatar
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.owner}
            error={commonT(touchedErrors?.owner, {
              name: projectT("budget.form.owner"),
            })}
            rootSx={sxInput}
            fullWidth
            onEndReached={onEndReached}
            onChangeSearch={(name: string, newValue?: string | number) =>
              onGetEmployeeOptions({
                pageIndex: 1,
                pageSize: 20,
                [name]: newValue,
              })
            }
            searchProps={{
              value: filters?.email,
              placeholder: commonT("searchBy", { name: "email" }),
            }}
            onOpen={() => onGetEmployeeOptions({ pageIndex: 1, pageSize: 20 })}
          />
        </MenuList>
      </Stack>
    </FormLayout>
  );
};

export default memo(ModalAddBudget);
