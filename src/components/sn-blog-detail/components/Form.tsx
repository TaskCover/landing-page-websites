import { Autocomplete, Button, Checkbox, FormControlLabel, Grid, Stack, TextField } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import { Input, Upload } from "components/shared";
import { DataAction } from "constant/enums";
import { ACCESS_TOKEN_STORAGE_KEY, AN_ERROR_TRY_AGAIN, NS_BLOG, NS_COMMON } from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useAuth, useSnackbar } from "store/app/selectors";
import { BlogData, BlogFormData } from "store/blog/actions";
import { getMessageErrorByAPI } from "utils/index";
import * as Yup from "yup";
import { UnprivilegedEditor } from "react-quill";
import UploadFile from "components/shared/UploadFile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTagOptions, useTags } from "store/tags/selector";
import { useCategoryBlog } from "store/blog-category/selectors";
import { clientStorage } from "utils/storage";
import { useDispatch } from "react-redux";
import { ContactlessOutlined, Label } from "@mui/icons-material";
import CustomAutocomplete from "./SelectCategories";
import SelectCategories from "./SelectCategories";
import { Category } from "store/blog-category/reducer";
import SelectMultiple from "./SelectMultiple";
import EditorView from "./EditorView";
import { Endpoint, client } from "api";

type FormProps = {
  initialValues: BlogFormData;
  type: DataAction;
  onSubmit: (values: BlogFormData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();
  const { user, onGetProfile } = useAuth();
  const blogT = useTranslations(NS_BLOG);
  const commonT = useTranslations(NS_COMMON);
  const editorRef = useRef<UnprivilegedEditor | undefined>();
  const { tagsOptions, onSearchTags } = useTagOptions();
  const { onCreateTags } = useTags();
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [data, setData] = useState<any | undefined>(undefined);
  const blogFormTranslatePrefix = "blogForm";
  const {
    items,
    onGetOptions: onGetCategoryOptions,
  } = useCategoryBlog();
  useEffect(() => {
    onGetCategoryOptions({ pageIndex: 1, pageSize: 50 });
  }, [onGetCategoryOptions]);


  const onSubmit = async (values: BlogFormData) => {
    try {
        const newItem = await onSubmitProps(values);
        if (newItem) {
            onAddSnackbar(
                blogT("blogCategory.notification.success", { label }),
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
    enableReinitialize: true,
    onSubmit,
});

  // set value
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

  const handleChangeName = (event) => {
    const nameValue = event.target.value;
    const slugValue = nameValue
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    formik.setFieldValue("title", nameValue);
    formik.setFieldValue("slug", slugValue);
  };

  const onSelect = (data) => {
    const mappingData = data.map((item) => item.label);
    console.log(mappingData);
    console.log("data : "+data)
    formik.setFieldValue("tag", mappingData);
  };
  const onEnter = (value: string | undefined) => {
    if (!value) return;
    const tags = formik.values?.tag ?? [];
    const isExisted = tagsOptions.find((item) => item.label === value);
    const convertedTags = tags.map((item) => ({
      label: item,
      value: item,
    }));

    if (isExisted) {
      onSelect([
        ...convertedTags,
        {
          label: value,
          value: isExisted.value,
        },
      ]);
      return;
    }

    onCreateTags({
      name: value,
    });
  };

  const onChangeField = (name: string, newValue?: any) => {
    formik.setFieldValue(name, newValue);
  };

  const onChangeContent = (value: string, delta, _, editor: UnprivilegedEditor) => {
    const isEmpty = value === "<p><br></p>";
    setContent(isEmpty ? "" : value);
    editorRef.current = editor;
    formik.setFieldValue("content", isEmpty ? "" : value);
  };

  const onChangeAttactment = (files: File[]) => {
    setFiles(files);
    formik.setFieldValue("attachmentsUpload", files);
  };
  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<BlogFormData>, [key, error]) => {
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
        minWidth: { xs: "calc(100vw -24px)", sm: 1000 },
        maxWidth: { xs: "calc(100vw -24px)", sm: 700 },
        maxHeight: "calc(calc(var(--vh, 1vh) * 100) - 24px)",
      }}
      label={`${label} ${blogT("blogForm.key")}`}
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Stack>
            <Input
              fullWidth
              name="title"
              required
              onChange={(e) => {
                handleChangeName(e);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values?.title}
              rootSx={sxConfig.input}
              error={commonT(touchedErrors?.title, {
                name: blogT("blogForm.title"),
              }) ? 'error' : undefined}
              helperText={commonT(touchedErrors?.title, {
                name: blogT("blogForm.title"),
              })}
              title={blogT(`${blogFormTranslatePrefix}.title`)}
            />

            <Input
              fullWidth
              name="slug"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.slug}
              rootSx={sxConfig.input}
              title={blogT(`${blogFormTranslatePrefix}.slug`)}
              error={commonT(touchedErrors?.slug, {
                name: blogT("blogForm.slug"),
              }) ? 'error' : undefined}
              helperText={commonT(touchedErrors?.slug, {
                name: blogT("blogForm.slug"),
              })}
            />
            <Stack>
               <SelectCategories
                name="category"
                value={formik.values?.category}
                onChange={onChangeField}
              />
            </Stack>

            <SelectMultiple
                limitTags={3}
                options={tagsOptions}
                onSelect={(e, data) => onSelect(data)}
                onInputChange={(value) => onSearchTags(value)}
                onEnter={onEnter}
                label={blogT("blogForm.tag")}
                sx={sxConfig}
                value={formik.values.tag?.map((tag) => ({ label: tag, value: tag }))}
            />

            <UploadFile
              title={blogT("blogForm.background")}
              name="backgroundUpload"
              value={formik.values?.backgroundUpload}
              onChange={onChangeField} 
            />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Stack height={300}>
            <EditorView
              hasAttachment
              placeholder={blogT("blogForm.content")}
              onChange={onChangeContent}
              onChangeFiles={onChangeAttactment}
              value={formik.values.content}
              files={formik.values.attachmentsUpload}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
              ></Stack>
            </EditorView>
          </Stack>
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default memo(Form);

const sxConfig = {
  input: {
    height: 56,
  },
};
export const validationSchema = Yup.object().shape({
  title: Yup.string().required('form.error.required'),
  slug: Yup.string().required('form.error.required'),
  content: Yup.string().required('form.error.required'),
  background: Yup.object().required('form.error.required'),
  attachments: Yup.array()
    .of(Yup.object({
      name: Yup.string().required('form.error.required'),
    }))
    .min(1, 'form.error.required'),
    category: Yup.array()
    .of(Yup.string())
    .min(1, 'form.error.required'),
  tag: Yup.array().of(Yup.string()),
});
