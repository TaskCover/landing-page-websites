import { CardContent, Grid, Radio, Stack, TextField, Typography } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  AN_ERROR_TRY_AGAIN,
  NS_COMMON,
  NS_CAREER
} from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { memo, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { getMessageErrorByAPI } from "utils/index";
import { DataAction } from "constant/enums";
import { useTranslations } from "next-intl";
import { CareerData } from "store/career/action";
import { CareergDataForm } from "store/career/type";

type FormProps = {
  initialValues: CareergDataForm;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: CareergDataForm) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();
  const careerT = useTranslations(NS_CAREER);
  const commonT = useTranslations(NS_COMMON);

  const label = useMemo(() => {
    console.log("Đã vào đây");
    console.log(DataAction);
    switch (type) {
      case DataAction.CREATE:
        return commonT("createNew");
      case DataAction.UPDATE:
        return commonT("update");
      default:
        return "";
    }
  }, [commonT, type]);

  const onSubmit = async (values: CareergDataForm) => {
    try {
      const newItem = await onSubmitProps(values);
      // console.log("Đã Vào đây");
      // console.log(newItem);
      if (newItem) {
        onAddSnackbar(
          careerT("career_success.notification.success_responsed", { label }),
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
      (out: FormikErrors<CareerData>, [key, error]) => {
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
        minWidth: { xs: "calc(100vw - 24px)", lg: 800 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 1200 },
        minHeight: "auto",
        color: "black"
      }}
      label={`${label} ${careerT("title_form")}`}
      onSubmit={formik.handleSubmit}
      disabled={disabled}
      submitting={formik.isSubmitting}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>

        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-required"
            label={careerT("form_career.title")}
            fullWidth
            size="small"
            focused
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="outlined-required"
            label={careerT("form_career.slug")}
            fullWidth
            size="small"
            focused
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label= {careerT("form_career.start_time")}
              defaultValue={dayjs()}
              sx={{
                width: "100%",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#29c9c1",
                  borderColor: "#29c9c1",
                },
                "& .MuiInputLabel-root": {  // Quy tắc cho MuiInputLabel khi không focus
                  color: "#29c9c1",
                  borderColor: "#29c9c1",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover > fieldset": {
                    borderColor: "#29c9c1",
                  },
                  '& fieldset': {
                    borderColor: '#29c9c1',
                  },
                  height: "45px",
                  borderRadius: "6px",
                  borderColor: "#29c9c1",  // Quy tắc cho borderColor khi không hover
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label= {careerT("form_career.end_time")}
              defaultValue={dayjs()}
              sx={{
                width: "100%",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#29c9c1",
                  borderColor: "#29c9c1",
                },
                "& .MuiInputLabel-root": {  // Quy tắc cho MuiInputLabel khi không focus
                  color: "#29c9c1",
                  borderColor: "#29c9c1",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover > fieldset": {
                    borderColor: "#29c9c1",
                  },
                  '& fieldset': {
                    borderColor: '#29c9c1',
                  },
                  height: "45px",
                  borderRadius: "6px",
                  borderColor: "#29c9c1",  // Quy tắc cho borderColor khi không hover
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="outlined-required"
            label={careerT("form_career.location")}
            fullWidth
            size="small"
            focused
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-number"
            label={careerT("form_career.numberOfHires")}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            focused
            fullWidth
            size="small"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {/* <Radio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
          /> */}
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-multiline-static"
            label={careerT("form_career.description")}
            multiline
            focused
            color="secondary"
            required
            name="responsed_content"
            rows={4}
            placeholder={careerT("form_Feedback.placeholder")}
            fullWidth
            size="small"
          // error={
          //   !!commonT(touchedErrors?.responsed_content, {
          //     name: "responsed_content",
          //   })
          // }
          // helperText={commonT(touchedErrors?.responsed_content, {
          //   name: careerT("form_Feedback.responsed_content"),
          // })}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({

});
