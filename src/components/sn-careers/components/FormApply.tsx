import React, { memo, useMemo, useState } from "react";
import { InputBase, Stack, TextField, styled } from "@mui/material";
import { Button, Text } from "components/shared";
import { ListFormSubmit } from "../helpers/helpers";
import { FormType } from "constant/enums";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { CareerData } from "store/career/action";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListPolicies } from "components/sn-privacy-policy/configs";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Upload from "components/sn-docs/news/change-cover-panel/Upload";
import dayjs from "dayjs";
import Image from "next/image";

type FormApplyProps = {};

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
  const [value, setValue] = useState();

  const onSubmit = () => {};

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
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

  const onChangeField = (key: string, newValue?: any) => {
    formik.setFieldValue(key, newValue);
  };

  const handleChangeDate = (val) => {};
  const handleChangeDropdown = (val) => {};
  const handleFileUpload = (key, e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    console.log(key, "--key---");

    formik.setFieldValue(key, imageUrl);
  };

  console.log(formik.values, "--formik.values---");

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
                      <TextField
                        required
                        id="outlined-required"
                        placeholder={form.label}
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
                          {Gentle_list.map((e) => (
                            <MenuItem value={e.value}>{e.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  )}
                  {form.type === FormType.Link && <Stack width="100%"></Stack>}
                  {form.type === FormType.NumberPicker && (
                    <Stack>
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
                    </Stack>
                  )}
                  {form.type === FormType.Upload && (
                    <Stack>
                      <label
                        htmlFor="file-upload"
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
                        id="file-upload"
                        type="file"
                        onChange={(e) => handleFileUpload(form.key, e)}
                        style={{ display: "none" }}
                      />

                      {formik.values[form.key] ? (
                        <Stack>
                          <img
                            src={formik.values[form.key]}
                            alt="Selected"
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "cover",
                            }}
                          />
                          {/* <Image
                            src={formik.values[form.key]}
                            alt="image"
                            width={100}
                            height={100}
                            style={{
                              maxHeight: "100px",
                              width: "auto",
                            }}
                          /> */}
                        </Stack>
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
      <Stack width="100%" alignItems="end">
        <Button
          sx={{
            p: "12px 24px",
            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
            width: { xs: "105px", md: "130px" },
            mb: "24px",
          }}
        >
          <Text variant="h5" color="#fff" onClick={onSubmit}>
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

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().trim().required("form.error.required"),
  last_name: Yup.string().trim().required("form.error.required"),
  email: Yup.string().trim().required("form.error.required"),
  phone_number: Yup.string().trim().required("form.error.required"),
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
  birthday: dayjs(new Date()),
  gentle: Gentle_list[0].value,
  email: "",
  phone_number: "",
  your_resume: null,
  attachment: null,
  portfolio: "",
};
