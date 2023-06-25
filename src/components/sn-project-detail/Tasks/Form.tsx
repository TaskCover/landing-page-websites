import { Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import {
  AN_ERROR_TRY_AGAIN,
  DATE_FORMAT_FORM,
  NS_COMMON,
  NS_PROJECT,
} from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { memo, useEffect, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { cleanObject, formatDate, getMessageErrorByAPI } from "utils/index";
import { TaskData } from "store/project/actions";
import { DataAction } from "constant/enums";
import { DatePicker, Input, InputNumber, Select } from "components/shared";
import { useEmployeeOptions } from "store/company/selectors";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type FormProps = {
  initialValues?: Partial<TaskData>;
  type: DataAction;
  onSubmit: (
    values: TaskData,
    taskListId: string,
    taskId?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  taskListId: string;
  taskId?: string;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const {
    initialValues = INITIAL_VALUES,
    type,
    onSubmit: onSubmitProps,
    taskListId,
    taskId,
    ...rest
  } = props;
  const { onAddSnackbar } = useSnackbar();

  const {
    options: employeeOptions,
    onGetOptions,
    isFetching,
    filters,
    pageSize,
    pageIndex,
    totalPages,
  } = useEmployeeOptions();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const label = useMemo(() => {
    switch (type) {
      case DataAction.CREATE:
        return commonT("createNew");
      case DataAction.UPDATE:
        return commonT("update");
      default:
        return "";
    }
  }, [commonT, type]);

  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]);

  const validationSchema = useMemo(() => {
    if (type === DataAction.CREATE) {
      return createValidationSchema;
    }
    return baseValidationSchema;
  }, [type]);

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const onSubmit = async (values: TaskData) => {
    try {
      let dataParsed = { ...values } as TaskData;
      if (dataParsed.start_date) {
        dataParsed.start_date = formatDate(
          dataParsed.start_date,
          DATE_FORMAT_FORM,
        );
      }
      if (values.end_date) {
        dataParsed.end_date = formatDate(dataParsed.end_date, DATE_FORMAT_FORM);
      }

      dataParsed = cleanObject(dataParsed) as TaskData;
      const newItem = await onSubmitProps(dataParsed, taskListId, taskId);

      if (newItem) {
        onAddSnackbar(
          projectT("detailTasks.notification.taskSuccess", { label }),
          "success",
        );
        props.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  const formik = useFormik({
    initialValues: initialValues as TaskData,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<TaskData>, [key, error]) => {
        if (formik.touched[key]) {
          out[key] = error;
        }
        return out;
      },
      {},
    );
  }, [formik.touched, formik.errors]);

  const disabled = useMemo(
    () => !!Object.values(touchedErrors)?.length || formik.isSubmitting,
    [touchedErrors, formik.isSubmitting],
  );

  const onChangeSearch = (name: string, newValue?: string | number) => {
    onGetOptions({ pageIndex: 1, pageSize: 20, [name]: newValue });
  };

  const onChangeDate = (name: string, newDate?: Date) => {
    formik.setFieldValue(name, newDate ? newDate.getTime() : undefined);
    formik.setFieldTouched(name, true);

    // Fix validate failed when change network
    let timeout: NodeJS.Timeout | null = null;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      formik.validateForm();
    }, 50);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeField = (name: string, newValue?: any) => {
    formik.setFieldValue(name, newValue);
  };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw -24px)", sm: 700 },
        maxWidth: { xs: "calc(100vw -24px)", sm: 700 },
        maxHeight: "calc(100vh - 24px)",
        zIndex: 1201,
      }}
      label={`${label} ${projectT("detailTasks.key")}`}
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Input
          title={projectT("detailTasks.form.title.name")}
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          error={commonT(touchedErrors?.name, {
            name: projectT("detailTasks.form.title.name"),
          })}
          rootSx={sxConfig.input}
        />
        <Stack direction={{ sm: "row" }} spacing={2}>
          <DatePicker
            title={commonT("form.title.startDate")}
            name="start_date"
            onChange={onChangeDate}
            onBlur={formik.handleBlur}
            value={formik.values?.start_date}
            error={commonT(touchedErrors?.start_date, {
              name: commonT("form.title.startDate"),
            })}
            rootSx={sxConfig.input}
            fullWidth
          />
          <DatePicker
            title={commonT("form.title.endDate")}
            name="end_date"
            onChange={onChangeDate}
            onBlur={formik.handleBlur}
            value={formik.values?.end_date}
            error={commonT(touchedErrors?.end_date, {
              name: commonT("form.title.endDate"),
              name2: commonT("form.title.startDate"),
            })}
            rootSx={sxConfig.input}
            fullWidth
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Stack>
        <Stack direction={{ sm: "row" }} spacing={2}>
          <Select
            options={employeeOptions}
            title={commonT("assigner")}
            hasAvatar
            searchProps={{
              value: filters?.email,
              placeholder: commonT("searchBy", { name: "email" }),
            }}
            name="owner"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.owner}
            rootSx={sxConfig.input}
            fullWidth
            onChangeSearch={onChangeSearch}
            onEndReached={onEndReached}
          />
          <InputNumber
            title={projectT("detailTasks.form.title.expectCompletionTime")}
            name="estimated_hours"
            onChange={onChangeField}
            onBlur={formik.handleBlur}
            value={formik.values?.estimated_hours}
            rootSx={sxConfig.input}
            fullWidth
            numberType="integer"
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Stack>
        <Input
          title={commonT("form.title.note")}
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.description}
          fullWidth
          multiline
          sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(Form);

const baseValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("form.error.required"),
});

const createValidationSchema = baseValidationSchema.shape({
  start_date: Yup.number(),
  end_date: Yup.number().min(Yup.ref("start_date"), "form.error.gte"),
});

const sxConfig = {
  input: {
    height: 56,
  },
};

const INITIAL_VALUES = {
  name: "",
  start_date: "",
  end_date: "",
  description: "",
} as Partial<TaskData>;
