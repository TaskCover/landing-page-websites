import { Dispatch, SetStateAction, memo, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { DialogLayoutProps } from "components/DialogLayout";
import { Select } from "components/shared";
import { useTaskOptions, useTasksOfProject } from "store/project/selectors";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { useFormik, FormikErrors } from "formik";
import { useTranslations } from "next-intl";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { useParams } from "next/navigation";

type MoveTaskListProps = {
  oldTaskListIds: string[];
  taskIds: {
    [key: string]: string[];
  };
  setIsSubmitting?: Dispatch<SetStateAction<boolean>>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const MoveTaskList = (props: MoveTaskListProps) => {
  const { oldTaskListIds, taskIds, setIsSubmitting, ...rest } = props;

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

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      setIsSubmitting && setIsSubmitting(true);
      for (const taskListId of oldTaskListIds) {
        await onMoveTask(
          taskListId,
          values.task_list_move,
          taskIds[taskListId],
        );
      }

      onAddSnackbar(
        projectT("detailTasks.notification.moveSuccess"),
        "success",
      );
      props.onClose();
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    } finally {
      setIsSubmitting && setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<typeof INITIAL_VALUES>, [key, error]) => {
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
const INITIAL_VALUES = {
  task_list_move: "",
};

const validationSchema = Yup.object().shape({
  task_list_move: Yup.string().trim().required("form.error.required"),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
