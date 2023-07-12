import { Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import {
  AN_ERROR_TRY_AGAIN,
  DATE_FORMAT_FORM,
  IMAGES_ACCEPT,
  NS_COMMON,
  NS_PROJECT,
} from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { memo, useEffect, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { cleanObject, formatDate, getMessageErrorByAPI } from "utils/index";
import { ProjectData } from "store/project/actions";
import { DataAction } from "constant/enums";
import {
  DatePicker,
  Input,
  InputNumber,
  Select,
  Upload,
} from "components/shared";
import { useEmployeeOptions } from "store/company/selectors";
import { SelectMembers } from "./components";
import { Member } from "./components/helpers";
import {
  usePositionOptions,
  useProjectTypeOptions,
} from "store/global/selectors";
import { Endpoint, client } from "api";
import { useTranslations } from "next-intl";

export type ProjectDataForm = Omit<ProjectData, "members" | "avatar"> & {
  members?: Member[];
  avatar?: string | File;
};

type FormProps = {
  initialValues: ProjectDataForm;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: ProjectData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();
  const {
    isFetching: projectTypeOptionsIsFetching,
    totalPages: projectTypeOptionsTotalPages,
    pageIndex: projectTypeOptionsPageIndex,
    options: projectTypeOptions,
    onGetOptions: onGetProjectTypeOptions,
    pageSize: projectTypeOptionsPageSize,
  } = useProjectTypeOptions();
  const { options: positionOptions } = usePositionOptions();
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

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const onSubmit = async (values: ProjectDataForm) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dataParsed: any = { ...values };
      if (dataParsed?.start_date) {
        dataParsed.start_date = formatDate(
          dataParsed.start_date,
          DATE_FORMAT_FORM,
        );
      }
      if (values?.end_date) {
        dataParsed.end_date = formatDate(dataParsed.end_date, DATE_FORMAT_FORM);
      }
      if (dataParsed?.members?.length) {
        dataParsed.members = dataParsed.members.map(
          ({ fullname, ...rest }) => rest,
        );

        const positionIds = positionOptions.map((posItem) => posItem.value);
        const isMissingPosition = dataParsed.members.some(
          (member: Member) => !positionIds.includes(member.position_project),
        );

        if (isMissingPosition) {
          throw projectT("list.notification.invalidPositions");
        }
      }
      if (typeof values["avatar"] === "object") {
        const logoUrl = await client.upload(Endpoint.UPLOAD, values["avatar"]);
        dataParsed["avatar"] = [logoUrl];
      } else {
        delete dataParsed["avatar"];
      }

      dataParsed = cleanObject(dataParsed) as ProjectData;
      const newItem = await onSubmitProps(dataParsed);

      if (newItem) {
        onAddSnackbar(
          projectT("list.notification.success", { label }),
          "success",
        );
        props.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<ProjectDataForm>, [key, error]) => {
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

  const onProjectTypeOptionsEndReached = () => {
    if (
      projectTypeOptionsIsFetching ||
      (projectTypeOptionsTotalPages &&
        projectTypeOptionsPageIndex >= projectTypeOptionsTotalPages)
    )
      return;
    onGetOptions({
      pageSize: projectTypeOptionsPageSize,
      pageIndex: projectTypeOptionsPageIndex + 1,
    });
  };

  const onChangeSearch = (name: string, newValue?: string | number) => {
    onGetOptions({ pageIndex: 1, pageSize: 20, [name]: newValue });
  };

  const onGetEmployeeOptions = (name: string, newValue?: string | number) => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  };

  useEffect(() => {
    onGetProjectTypeOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetProjectTypeOptions]);

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw -24px)", sm: 700 },
        maxWidth: { xs: "calc(100vw -24px)", sm: 700 },
        maxHeight: "calc(calc(var(--vh, 1vh) * 100) - 24px)",
      }}
      label={`${label} ${projectT("list.key")}`}
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Input
          title={projectT("list.form.title.name")}
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          error={commonT(touchedErrors?.name, {
            name: projectT("list.form.title.name"),
            max: MAX_NAME_CHARACTERS,
          })}
          rootSx={sxConfig.input}
        />
        <Stack direction={{ sm: "row" }} spacing={2}>
          <Select
            options={employeeOptions}
            title={commonT("assigner")}
            name="owner"
            hasAvatar
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.owner}
            error={commonT(touchedErrors?.owner, { name: commonT("assigner") })}
            rootSx={sxConfig.input}
            fullWidth
            onEndReached={onEndReached}
            onChangeSearch={onChangeSearch}
            searchProps={{
              value: filters?.email,
              placeholder: commonT("searchBy", { name: "email" }),
            }}
            onOpen={onGetEmployeeOptions}
          />
          <Select
            options={projectTypeOptions}
            title={projectT("list.form.title.projectType")}
            name="type_project"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.type_project}
            error={commonT(touchedErrors?.type_project, {
              name: projectT("list.form.title.projectType"),
            })}
            rootSx={sxConfig.input}
            fullWidth
            onEndReached={onProjectTypeOptionsEndReached}
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Stack>
        <SelectMembers
          name="members"
          value={formik.values?.members}
          onChange={onChangeField}
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
          <InputNumber
            title={projectT("list.form.title.estimatedCost")}
            name="expected_cost"
            onChange={onChangeField}
            onBlur={formik.handleBlur}
            value={formik.values?.expected_cost}
            error={commonT(touchedErrors?.expected_cost, {
              name: projectT("list.form.title.estimatedCost"),
            })}
            rootSx={sxConfig.input}
            fullWidth
            numberType="integer"
          />
          <InputNumber
            title={projectT("list.form.title.estimatedWorkingHours")}
            name="working_hours"
            onChange={onChangeField}
            onBlur={formik.handleBlur}
            value={formik.values?.working_hours}
            error={commonT(touchedErrors?.working_hours, {
              name: projectT("list.form.title.estimatedWorkingHours"),
            })}
            rootSx={sxConfig.input}
            fullWidth
            numberType="integer"
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Stack>
        <Stack direction={{ sm: "row" }} spacing={2}>
          <Upload
            title="Logo"
            name="avatar"
            value={formik.values?.avatar}
            onChange={onChangeField}
          />
          <Input
            title={commonT("form.title.description")}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.description}
            error={commonT(touchedErrors?.description, {
              name: commonT("form.title.description"),
            })}
            fullWidth
            multiline
            sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
          />
        </Stack>
      </Stack>
    </FormLayout>
  );
};

export default memo(Form);

const MAX_NAME_CHARACTERS = 50;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("form.error.required")
    .max(MAX_NAME_CHARACTERS, "form.error.overMax"),
  description: Yup.string(),
  owner: Yup.string(),
  type_project: Yup.string(),
  start_date: Yup.number(),
  end_date: Yup.number().min(Yup.ref("start_date"), "form.error.gte"),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
