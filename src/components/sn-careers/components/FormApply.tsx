import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { InputBase, Stack, TextField, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formErrorCode } from "api/formErrorCode";
import { Button, Input, Text } from "components/shared";
import { FormType } from "constant/enums";
import { ACCESS_TOKEN_STORAGE_KEY, NS_COMMON } from "constant/index";
import { ErrorResponse } from "constant/types";
import dayjs from "dayjs";
import { FormikErrors, useFormik } from "formik";
import ErrorIcon from "icons/ErrorIcon";
import { useTranslations } from "next-intl";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSnackbar } from "store/app/selectors";
import { ApplyParams } from "store/career/action";
import { useCareer } from "store/career/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { clientStorage } from "utils/storage";
import * as Yup from "yup";
import { ListFormSubmit } from "../helpers/helpers";
import { client } from "api/client";
import { Endpoint } from "api";
import Link from "components/Link";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FileIcon from "icons/FileIcon";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { EMAIL_REGEX, URL_REGEX } from "constant/regex";
type FormApplyProps = {
  slug: string | Array<string>;
  setShowForm?: (val: boolean) => void;
};

const CustomPhoneInput = ({ value, onChange }) => (
  <TextField
    id="outlined-required"
    placeholder={"Enter phone number"}
    fullWidth
    size="small"
    focused
    color="secondary"
    onChange={(e) => onChange(e.target.value)}
    value={value}
  />
);

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    width: "100%",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BDD6FB",
    fontSize: 16,
    fontWeight: 500,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    padding: "8px 14px",
    alignItems: "center",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const FormApply = (props: FormApplyProps) => {
  const { slug, setShowForm } = props;
  const [value, setValue] = useState();
  const commonT = useTranslations(NS_COMMON);
  const { onAddSnackbar } = useSnackbar();
  const { onCreateFormApply } = useCareer();


  const onSubmit = async (values: ApplyParams) => {
    try {
      const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
      // return 200;
      const resp = await onCreateFormApply(slug as string, values, accessToken);

      if (resp && resp?.payload.id as any) {
        onAddSnackbar("Apply for job success", "success");
        formik.resetForm();
        setShowForm && setShowForm(false)
      }

    } catch (error) {
      onAddSnackbar("Apply for job fail", "error");

      // if ((error as ErrorResponse)["code"] === formErrorCode.INVALID_DATA) {
      //   onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      // } else {
      //   onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      // }
    }
  };
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit(values) {
      onSubmit(values);
    },
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
  console.log(touchedErrors, '--touchedErrors--');


  const disabled = useMemo(
    () => !!Object.values(touchedErrors)?.length,
    [touchedErrors, formik.isSubmitting],
  );


  const onChangeField = (key: string, newValue?: any) => {
    formik.setFieldValue(key, newValue);
  };

  const handleFileUpload = useCallback(async (key, e, isArrayValue) => {
    const selectedImage = e.target.files[0];
    let values;

    if (selectedImage) {
      const resData = await client.upload(Endpoint.UPLOAD_ANY, selectedImage);
      if (resData) {
        if (isArrayValue) {
          values = [...formik.values[key], resData?.download];
        } else {
          values = resData?.download;
        }
      }

    }

    formik.setFieldValue(key, values);

  }, [formik.values["attachments"], formik.values["resume"]]);


  return (
    <Stack
      width="100%"
      sx={{
        p: "24px",
        gap: "24px",
        borderRadius: "16px",
        border: "1px solid #fff",
        backgroundColor: "rgba(255, 255, 255, 0.50)",
        boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
      }}
    >
      {ListFormSubmit.map((form, index) => {
        return (
          <>
            <FieldContainer
              label={form.label}
              childField={
                <>
                  {form.type === FormType.Input && (
                    <Stack>
                      <Input
                        required
                        id="outlined-required"
                        placeholder={form.placeholder}
                        fullWidth
                        size="small"
                        focused
                        color="secondary"
                        name={form.label}
                        onChange={(e) =>
                          onChangeField(form.key, e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values[form.key]}
                        error={touchedErrors[form.key]}
                        sx={{}}
                      />
                    </Stack>
                  )}
                  {form.type === FormType.DatePicker && (
                    <Stack>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          value={formik.values[form.key]}
                          onChange={(newValue) => {
                            onChangeField(form.key, newValue);
                          }}
                          sx={{
                            width: "100%",
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#29c9c1",
                              borderColor: "#29c9c1",
                            },
                            "& .MuiInputLabel-root": {
                              // Quy tắc cho MuiInputLabel khi không focus
                              color: "#29c9c1",
                              borderColor: "#29c9c1",
                            },
                            "& .MuiOutlinedInput-root": {
                              "&:hover > fieldset": {
                                borderColor: "#29c9c1",
                              },
                              "& fieldset": {
                                borderColor: "#29c9c1",
                              },
                              height: "45px",
                              borderRadius: "6px",
                              borderColor: "#29c9c1", // Quy tắc cho borderColor khi không hover
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  )}
                  {form.type === FormType.Dropdown && (
                    <Stack>
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          value={formik.values[form.key]}
                          onChange={(e) => {
                            onChangeField(form.key, e.target.value);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          input={<BootstrapInput />}
                        >
                          {Gentle_list.map((e, i) => (
                            <MenuItem key={i} value={e.value}>{e.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  )}
                  {form.type === FormType.Link && <Stack width="100%"></Stack>}
                  {form.type === FormType.NumberPicker && (
                    <Stack gap="4px">
                      <PhoneInput
                        international
                        defaultCountry="VN"
                        value={formik.values[form.key]}
                        onChange={(newValue) =>
                          onChangeField(form.key, newValue)
                        }
                        containerStyle={{}}
                        inputStyle={{}}
                        // inputComponent={CustomPhoneInput}
                        style={
                          {
                            // height: "1.5em",
                          }
                        }
                      />
                      {Boolean(touchedErrors[form.key]) ? (
                        <Stack direction="row" alignItems="center" gap="4px">
                          <ErrorIcon color="error" width={16} height={16} />
                          <Text
                            sx={{
                              fontSize: "12px",
                              lineHeight: "16px",
                              color: "#999999",
                            }}
                          >
                            {/* {commonT(touchedErrors[form.key], {
                              name: form.label,
                            })} */}
                            {touchedErrors[form.key]}
                          </Text>
                        </Stack>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  )}
                  {form.type === FormType.Upload && (
                    <Stack>
                      <label
                        htmlFor={form.key}
                        style={{
                          padding: "10px 16px",
                          background:
                            "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          border: "1px solid #0575E6",
                          borderRadius: "24px",
                          width: "120px",
                          marginBottom: "8px",
                        }}
                      >
                        Choose file
                      </label>
                      <input
                        id={form.key}
                        type="file"
                        onChange={(e) =>
                          handleFileUpload(form.key, e, form.isArrayValue)
                        }
                        style={{ display: "none" }}
                      />
                      {Boolean(touchedErrors[form.key]) ? (
                        <Stack direction="row" alignItems="center" gap="4px">
                          <ErrorIcon color="error" width={16} height={16} />
                          <Text
                            sx={{
                              fontSize: "12px",
                              lineHeight: "16px",
                              color: "#999999",
                            }}
                          >
                            {touchedErrors[form.key]}
                          </Text>
                        </Stack>
                      ) : (
                        <></>
                      )}
                      {Boolean(formik.values[form.key]?.length) ? (
                        form.isArrayValue ? (
                          <Stack gap="8px" direction="row">
                            {formik.values[form.key].map((e, i) => (

                              <Stack
                                key={i}
                                sx={{
                                  position: "relative",
                                }}
                              >
                                <Stack
                                  onClick={() =>
                                    formik.setFieldValue(
                                      form.key,
                                      formik.values[form.key].filter(
                                        (val) => val !== e,
                                      ),
                                    )
                                  }
                                  sx={{
                                    position: "absolute",
                                    top: 1,
                                    left: 1,
                                    transition: ".3s",
                                    "&:hover": {
                                      cursor: "pointer",
                                      transform: "scale(1.1)",
                                      transition: ".3s",
                                    },
                                  }}
                                >
                                  <RemoveCircleOutlineIcon
                                    width={20}
                                    height={20}
                                    color="inherit"
                                  />
                                </Stack>
                                <Link
                                  key={i}
                                  href={e.toString()}
                                  download
                                  target="_blank"
                                  underline="none"
                                  color="inherit"
                                >
                                  <SimCardDownloadIcon sx={{ fontSize: 70 }} color={"primary"} />
                                </Link>
                              </Stack>
                            ))}
                          </Stack>
                        ) : (
                          <Link
                            href={formik.values[form.key].toString()}
                            download
                            target="_blank"
                            underline="none"
                            color="inherit"
                          >
                            <SimCardDownloadIcon sx={{ fontSize: 70 }} color={"primary"} />
                          </Link>
                        )
                      ) : (
                        <Stack>
                          <Text variant="h6">
                            Images wider that 1500 pixels work best.
                          </Text>
                          <Text variant="h6">
                            The maximum size per file is 5MB.
                          </Text>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </>
              }
            />
          </>
        );
      })}
      <Stack component="form" width="100%" alignItems="end">
        <Button
          disabled={disabled}
          sx={{
            p: "12px 24px",
            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
            width: { xs: "105px", md: "130px" },
            mb: "24px",
            "&:hover": {
              cursor: disabled ? "not-allowed" : "pointer",
            },
          }}
          onClick={() => formik.handleSubmit()}
        >
          <Text variant="h5" color="#fff">
            Submit
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(FormApply);

const FieldContainer = ({ label, childField }) => {
  return (
    <Stack
      display="grid"
      gridTemplateColumns="1fr 3fr"
      gap="24px"
      alignItems="center"
    >
      <Text variant="h5">{label}</Text>
      <Stack width="100%">{childField}</Stack>
    </Stack>
  );
};
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().trim().required("Không được để trông "),
  last_name: Yup.string().trim().required("Không được để trông "),
  email: Yup.string().matches(EMAIL_REGEX, 'Email không hợp lệ').required("Không được để trông "),
  phone: Yup.string().trim().required("Không được để trông "),
  // birth: Yup.string().trim().required("Không được để trông "),
  gender: Yup.string().trim().required("Không được để trông "),
  resume: Yup.string().trim().required("Không được để trông "),
  socialLink: Yup.string().matches(URL_REGEX, 'URL không hợp lệ').required("Không được để trông "),
  // .url('URL phải có định dạng hợp lệ.')
  // .matches(/^https:\/\//, 'URL phải bắt đầu bằng "https://"'),
  // attachments: Yup.string().trim().required("form.error.required"),
});

const Gentle_list = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

const INITIAL_VALUES = {
  first_name: "",
  last_name: "",
  birth: dayjs(new Date()) as any,
  gender: Gentle_list[0].value,
  email: "",
  phone: "",
  resume: "",
  attachments: [],
  socialLink: "",
};
