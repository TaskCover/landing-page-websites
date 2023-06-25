import { memo, useEffect, useMemo } from "react";
import { Input, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { DialogLayoutProps } from "components/DialogLayout";
import { Select } from "components/shared";
import { MoveTaskData } from "store/project/actions";
import { useTaskOptions, useTasksOfProject } from "store/project/selectors";
import { DataAction } from "constant/enums";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { useFormik, FormikErrors } from "formik";
import { useTranslations } from "next-intl";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { useParams } from "next/navigation";

type MoveTaskListProps = {
  oldTaskListId: string;
  taskId: string;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const MoveTaskList = (props: MoveTaskListProps) => {
  const { oldTaskListId, taskId, ...rest } = props;

  const { onAddSnackbar } = useSnackbar();
  const { onMoveTask } = useTasksOfProject();
  const {
    options,
    onGetOptions,
    isFetching,
    filters,
    pageSize,
    pageIndex,
    totalPages,
  } = useTaskOptions();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);

  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]);

  const initialValues = useMemo(
    () => ({
      task_list_current: oldTaskListId,
      task_current: taskId,
      task_list_move: "",
    }),
    [oldTaskListId, taskId],
  );

  const onSubmit = async (values: MoveTaskData) => {
    try {
      const isSuccess = await onMoveTask(
        values.task_list_current,
        values.task_list_move,
        values.task_current,
      );
      if (isSuccess === true) {
        onAddSnackbar(
          projectT("detailTasks.notification.moveSuccess"),
          "success",
        );
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
      (out: FormikErrors<MoveTaskData>, [key, error]) => {
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

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  useEffect(() => {
    if (!projectId) return;
    onGetOptions({ project: projectId, pageIndex: 1, pageSize: 20 });
  }, [onGetOptions, projectId]);

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      label={projectT("detailTasks.moveTaskList")}
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Select
          options={options}
          title={projectT("detailTasks.form.title.oldTaskList")}
          name="task_list_current"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.task_list_current}
          error={commonT(touchedErrors?.task_list_current, {
            name: projectT("detailTasks.form.title.oldTaskList"),
          })}
          rootSx={sxConfig.input}
          fullWidth
          disabled
        />
        <Select
          options={options}
          title={projectT("detailTasks.form.title.newTaskList")}
          name="task_list_move"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.task_list_move}
          error={commonT(touchedErrors?.task_list_move, {
            name: projectT("detailTasks.form.title.newTaskList"),
          })}
          rootSx={sxConfig.input}
          fullWidth
          onEndReached={onEndReached}
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(MoveTaskList);

const validationSchema = Yup.object().shape({
  task_list_move: Yup.string().trim().required("form.error.required"),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
