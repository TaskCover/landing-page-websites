import { Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import {
  AN_ERROR_TRY_AGAIN,
  DATE_FORMAT_FORM,
  IMAGES_ACCEPT,
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

  const label = useMemo(() => {
    switch (type) {
      case DataAction.CREATE:
        return "Create new";
      case DataAction.UPDATE:
        return "Update";
      default:
        return "";
    }
  }, [type]);

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

  const onSubmit = async (values: ProjectDataForm) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dataParsed: any = { ...values };
      if (dataParsed.start_date) {
        dataParsed.start_date = formatDate(
          dataParsed.start_date,
          DATE_FORMAT_FORM,
        );
      }
      if (values.end_date) {
        dataParsed.end_date = formatDate(dataParsed.end_date, DATE_FORMAT_FORM);
      }
      if (dataParsed?.members?.length) {
        dataParsed.members = dataParsed.members.map(
          ({ fullname, ...rest }) => rest,
        );

        const positionIds = positionOptions.map((posItem) => posItem.value);
        const isMissingPosition = dataParsed.members.some(
          (member: Member) => !positionIds.includes(member.position),
        );

        if (isMissingPosition) {
          throw "The member list has one or more members with invalid positions.";
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
        onAddSnackbar(`${label} project successfully!`, "success");
        props.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
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
        maxHeight: "calc(100vh - 24px)",
      }}
      label={`${label} project`}
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Input
          title="Name"
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          error={touchedErrors?.name}
          rootSx={sxConfig.input}
        />
        <Stack direction={{ sm: "row" }} spacing={2}>
          <Select
            options={employeeOptions}
            title="Assigner"
            name="owner"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.owner}
            error={touchedErrors?.owner}
            rootSx={sxConfig.input}
            fullWidth
            onEndReached={onEndReached}
          />
          <Select
            options={projectTypeOptions}
            title="Project type"
            name="type_project"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.type_project}
            error={touchedErrors?.type_project}
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
            title="Start date"
            name="start_date"
            required
            onChange={onChangeDate}
            onBlur={formik.handleBlur}
            value={formik.values?.start_date}
            error={touchedErrors?.start_date}
            rootSx={sxConfig.input}
            fullWidth
          />
          <DatePicker
            title="End date"
            name="end_date"
            required
            onChange={onChangeDate}
            onBlur={formik.handleBlur}
            value={formik.values?.end_date}
            error={touchedErrors?.end_date}
            rootSx={sxConfig.input}
            fullWidth
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Stack>
        <Stack direction={{ sm: "row" }} spacing={2}>
          <InputNumber
            title="Estimated cost"
            name="expected_cost"
            onChange={onChangeField}
            onBlur={formik.handleBlur}
            value={formik.values?.expected_cost}
            error={touchedErrors?.expected_cost}
            rootSx={sxConfig.input}
            fullWidth
            numberType="integer"
          />
          <InputNumber
            title="Estimated working hours"
            name="working_hours"
            onChange={onChangeField}
            onBlur={formik.handleBlur}
            value={formik.values?.working_hours}
            error={touchedErrors?.working_hours}
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
            title="Description"
            name="description"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.description}
            error={touchedErrors?.description}
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

const NOW = new Date().setHours(0, 0, 0, 0);

const baseValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Project name is required.")
    .max(50, "Project name is too long, maximum 50 characters."),
  description: Yup.string().trim().required("Description is required."),
  owner: Yup.string().required("Assigner is required."),
  type_project: Yup.string().required("Project type is required."),
});

const createValidationSchema = baseValidationSchema.shape({
  start_date: Yup.number()
    .required("Start date is required.")
    .min(NOW, "The start date cannot be a date in the past."),
  end_date: Yup.number()
    .required("End date is required.")
    .min(
      Yup.ref("start_date"),
      "End date must be greater than or equal to start date.",
    ),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
