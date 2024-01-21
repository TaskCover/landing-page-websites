import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { InputBase, Stack, TextField, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { formErrorCode } from "api/formErrorCode";
import { Button, Input, Text } from "components/shared";
import { ACCESS_TOKEN_STORAGE_KEY, NS_COMMON } from "constant/index";
import { ErrorResponse } from "constant/types";
import { FormikErrors, useFormik } from "formik";
import ErrorIcon from "icons/ErrorIcon";
import { useTranslations } from "next-intl";
import { memo, useMemo, useState } from "react";
import "react-phone-number-input/style.css";
import { useSnackbar } from "store/app/selectors";
import { FormFeedbackBody } from "store/feedback/actions";
import { useFeedback } from 'store/feedback/selectors';
import { getMessageErrorByAPI } from "utils/index";
import { clientStorage } from "utils/storage";
import * as Yup from "yup";


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

type FormFeedbackProps = {
};


const FormFeedback = (props: FormFeedbackProps) => {
    const [value, setValue] = useState();
    const commonT = useTranslations(NS_COMMON);
    const { onAddSnackbar } = useSnackbar();
    const {
        onCreateFormFeedback,
    } = useFeedback();

    const onSubmit = async (values: FormFeedbackBody) => {
        try {
            const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
            // return 200;
            const resp = await onCreateFormFeedback(values, accessToken);

            if (resp["id"]) {
                onAddSnackbar(
                    "Feedback success",
                    "success",
                );
                formik.resetForm();
            }
        } catch (error) {
            onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
        }
    };
    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit(values) {
            onSubmit(values)
        }
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

    const onChangeField = (key: string, newValue?: any) => {
        formik.setFieldValue(key, newValue);
    };

    const handleFileUpload = (key, e, isArrayValue) => {
        const selectedImage = e.target.files[0];
        let values;
        if (isArrayValue) {
            values = [...formik.values[key], URL.createObjectURL(selectedImage)];

        } else {
            values = URL.createObjectURL(selectedImage);
        }

        formik.setFieldValue(key, values);
    };


    return (
        <Stack
            sx={[
                sectionContainerSx,
            ]}
        >

            <Stack
                width="100%"
                sx={{
                    p: "24px",
                    gap: "24px",
                    borderRadius: "16px",
                    border: "1px solid #fff",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                }}
            >
                <FieldContainer
                    label={"What topic can we help you with?"}
                    childField={
                        <Stack>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values["topic"]}
                                    onChange={(e) => {
                                        onChangeField("topic", e.target.value);
                                    }}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    input={<BootstrapInput />}
                                >
                                    {Feedback_type.map((e) => (
                                        <MenuItem value={e.value}>{e.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    }
                />
                <Stack
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap={{ xs: "24px", md: "40px" }}
                >
                    <FieldContainer
                        label={"First name"}
                        childField={
                            <Stack>
                                <Input
                                    required
                                    id="outlined-required"
                                    placeholder={"First name"}
                                    fullWidth
                                    size="small"
                                    focused
                                    color="secondary"
                                    onChange={(e) =>
                                        onChangeField("first_name", e.target.value)
                                    }
                                    onBlur={formik.handleBlur}
                                    value={formik.values["first_name"]}
                                    error={commonT(touchedErrors["first_name"], {
                                        name: "First name",
                                    })}
                                    sx={{}}
                                />
                            </Stack>
                        }
                    />
                    <FieldContainer
                        label={"Last name"}
                        childField={
                            <Stack>
                                <Input
                                    required
                                    id="outlined-required"
                                    placeholder={"Last name"}
                                    fullWidth
                                    size="small"
                                    focused
                                    color="secondary"
                                    onChange={(e) =>
                                        onChangeField("last_name", e.target.value)
                                    }
                                    onBlur={formik.handleBlur}
                                    value={formik.values["last_name"]}
                                    error={commonT(touchedErrors["last_name"], {
                                        name: "Last name",
                                    })}
                                    sx={{}}
                                />
                            </Stack>
                        }
                    />
                </Stack>
                <FieldContainer
                    label={"Email"}
                    childField={
                        <Stack>
                            <Input
                                required
                                id="outlined-required"
                                placeholder={"Email"}
                                fullWidth
                                size="small"
                                focused
                                color="secondary"
                                name={"Email"}
                                onChange={(e) =>
                                    onChangeField("email", e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                value={formik.values["email"]}
                                error={commonT(touchedErrors["email"], {
                                    name: "Email",
                                })}
                                sx={{}}
                            />
                        </Stack>
                    }
                />
                <FieldContainer
                    label={"Tell us more about what we can help you with"}
                    childField={
                        <Stack>
                            <Input
                                required
                                id="outlined-required"
                                placeholder={"Description"}
                                fullWidth
                                size="small"
                                focused
                                color="secondary"
                                name={"Description"}
                                onChange={(e) =>
                                    onChangeField("content", e.target.value)
                                }
                                onBlur={formik.handleBlur}
                                value={formik.values["content"]}
                                sx={{}}
                            />
                        </Stack>
                    }
                />
                <Stack
                    display="grid"
                    gridTemplateColumns="1fr 3fr"
                    gap="24px"
                    alignItems="center"
                >
                    <Text variant="h5">Upload file</Text>
                    <Stack width="100%">
                        <Stack>
                            <label
                                htmlFor={"attachments"}
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
                                id={"attachments"}
                                type="file"
                                onChange={(e) => handleFileUpload("attachments", e, true)}
                                style={{ display: "none" }}
                            />
                            {Boolean(touchedErrors["attachments"]) ?
                                <Stack direction="row" alignItems="center" gap="4px">
                                    <ErrorIcon color="error" width={16} height={16} />
                                    <Text sx={{
                                        fontSize: "12px",
                                        lineHeight: "16px",
                                        color: "#999999"
                                    }}>
                                        {commonT(touchedErrors["attachments"], {
                                            name: "Attachments",
                                        })}
                                    </Text>
                                </Stack> : <></>
                            }
                            {Boolean(formik.values["attachments"].length) ?
                                (
                                    <Stack gap="8px" direction="row" >
                                        {
                                            formik.values["attachments"].map((e, i) =>
                                            (
                                                <Stack
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Stack
                                                        onClick={() => formik.setFieldValue("attachments", formik.values["attachments"].filter(val => val !== e))}
                                                        sx={{
                                                            position: "absolute",
                                                            top: 1,
                                                            right: 1,
                                                            transition: ".3s",
                                                            "&:hover": {
                                                                cursor: "pointer",
                                                                transform: "scale(1.1)",
                                                                transition: ".3s",
                                                            }
                                                        }}>
                                                        <CancelOutlinedIcon width={20} height={20} fill="white" />
                                                    </Stack>
                                                    <img
                                                        src={e}
                                                        alt="Selected"
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </Stack>
                                            ))
                                        }
                                    </Stack>
                                )
                                : (
                                    <Stack>
                                        <Text variant="h6">
                                            Allow file doc, docx, xls, xlsx, ppt, pptx, pdf and up to 3mb
                                        </Text>
                                        <Text variant="h6">
                                            {`File name can't contain any of the following characters: '/, [, *, <, >, ;'`}
                                        </Text>
                                    </Stack>
                                )}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack component="form" width="100%" alignItems="end" >
                    <Button
                        disabled={disabled}
                        sx={{
                            p: "12px 24px",
                            background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                            width: { xs: "105px", md: "130px" },
                            mb: "24px",
                            "&:hover": {
                                cursor: disabled ? "not-allowed" : "pointer"
                            }
                        }}
                        onClick={() => formik.handleSubmit()}
                    >
                        <Text variant="h5" color="#fff">
                            Submit
                        </Text>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default memo(FormFeedback);

const FieldContainer = ({ label, childField }) => {
    return (
        <Stack
            alignItems="start"
            gap="8px"
        >
            <Text variant="h6">{label}</Text>
            <Stack width="100%">{childField}</Stack>
        </Stack>
    );
};

export const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("form.error.required"),
    last_name: Yup.string().trim().required("form.error.required"),
    email: Yup.string().trim().required("form.error.required"),
    topic: Yup.string().trim().required("form.error.required"),
    // attachments: Yup.string().trim().required("form.error.required"),
});

const Feedback_type = [
    {
        value: "góp ý",
        label: "Góp ý",
    },
    {
        value: "báo lỗi",
        label: "Báo lỗi",
    },
];

const INITIAL_VALUES = {
    topic: Feedback_type[0].value,
    first_name: "",
    last_name: "",
    email: "",
    content: "",
    attachments: [],
};

const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 60px" },
    position: 'relative',
};