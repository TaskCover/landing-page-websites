import { CardContent, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import {
  AN_ERROR_TRY_AGAIN,
  NS_COMMON,
  NS_FEEDBACK,
} from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { memo, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { getMessageErrorByAPI } from "utils/index";
import { DataAction } from "constant/enums";
import { useTranslations } from "next-intl";
import { FeedbackData } from "store/feedback/actions";
type FormProps = {
  initialValues: FeedbackData;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: FeedbackData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();
  const feedbackT = useTranslations(NS_FEEDBACK);
  const commonT = useTranslations(NS_COMMON);

  const label = useMemo(() => {
    switch (type) {
      case DataAction.UPDATE:
        // alert("")
        return commonT("update");
      default:
        return "";
    }
  }, [commonT, type]);

  const onSubmit = async (values: FeedbackData) => {
    try {
      const newItem = await onSubmitProps(values);
      // console.log("Đã Vào đây");
      // console.log(newItem);
      if (newItem) {
        onAddSnackbar(
          feedbackT("Feedback_success.notification.success_responsed"),
          "success",
        );
        // console.log("Đã vào đây");
        props.onClose();
      } else {
        // console.log("Đã Vào Đây Lỗi");
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
      (out: FormikErrors<FeedbackData>, [key, error]) => {
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

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 800},
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      label={`${feedbackT("form_Feedback.label_form_update")}`}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
      submitting={formik.isSubmitting}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {initialValues.name}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="body2" color="#212121">
              {feedbackT("feedbackTable.phone")}: {initialValues.phone}
            </Typography>
            <Typography sx={{ mb: 1 }} variant="body2" color="#424242">
              {feedbackT("feedbackTable.email")}: {initialValues.email}
            </Typography>
            <hr />
            <Stack>
              <Typography sx={{ mb: 1 }} color="#424242" variant="h5">
              {feedbackT("feedbackTable.subject")}: 
            </Typography>
            <Input
                    title={feedbackT("feedbackTable.subject")}
                    name="title"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values?.title}
                    color="secondary"
                />
            </Stack>
            <Typography variant="body2" color="#212121" style={{paddingTop:7}}>
              {feedbackT("feedbackTable.content")}: {initialValues.content}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack spacing={2} py={3}>
            <TextField
              id="outlined-multiline-static"
              label={feedbackT("form_Feedback.responsed_content")}
              multiline
              focused
              color="secondary"
              required
              name="responsed_content"
              rows={4}
              placeholder={feedbackT("form_Feedback.placeholder")}
              value={formik.values?.responsed_content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!commonT(touchedErrors?.responsed_content, {
                  name: "responsed_content",
                })
              }
              helperText={commonT(touchedErrors?.responsed_content, {
                name: feedbackT("form_Feedback.responsed_content"),
              })}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({
  responsed_content: Yup.string().trim().required("form.error.required"),
});
