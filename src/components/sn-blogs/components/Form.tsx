import { Button, Grid, Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import {  Input, Select, Upload } from "components/shared";
import { DataAction } from "constant/enums";
import { NS_BLOG, NS_COMMON } from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { memo, useMemo, useRef, useState } from "react";
import { useAuth, useSnackbar } from "store/app/selectors";
import { BlogData } from "store/blog/actions";
import { getMessageErrorByAPI } from "utils/index";
import * as Yup from "yup";
import SelectCategories from "./SelectCategories";
import { UnprivilegedEditor } from "react-quill";
import UploadFile from "components/shared/UploadFile";
import { Controller, useForm } from "react-hook-form";
import { useTagOptions, useTags } from "store/tags/selector";
import SelectMultiple from "./SelectMultiple";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryBlogData } from "store/blog-category/reducer";
import Editor from "components/Editor";

export type BlogForm = Omit<BlogData, "category" | "background"> & {
  category?: CategoryBlogData[];
  background?: string | File;
};
type FormProps = {
  initialValues: BlogForm;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: BlogForm) => Promise<any>;
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
  const blogFormTranslatePrefix = "blogForm";

  const schema = Yup.object().shape({
    title: Yup.string().required(
      commonT("form.error.required", {
        name: blogT(`${blogFormTranslatePrefix}.title`),
      }),),
    slug: Yup.string().required(
      commonT("form.error.required", {
        name: blogT(`${blogFormTranslatePrefix}.slug`),
      }),
    ),
    content: Yup.string().required(
      commonT("form.error.required", {
        name: blogT(`${blogFormTranslatePrefix}.content`),
      }
      )),
    background: Yup.string().required(
      commonT("form.error.required", {
        name: blogT(`${blogFormTranslatePrefix}.content`),
      }
      )),
    attachments: Yup
      .array()
      .of(Yup.string())
      .min(
        1,
        commonT("form.error.required", {
          name: blogT(`${blogFormTranslatePrefix}.attachments`),
        }),
      ),
    category: Yup
      .array()
      .of(Yup.string())
      .min(
        1,
        commonT("form.error.required", {
          name: blogT(`${blogFormTranslatePrefix}.category`),
        }),
      ),
    tag: Yup.array().of(Yup.string()),
  });


  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      background: "",
      attachments: [],
      category: [],
      tag: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: BlogForm) => {
    try {
      alert("ok");
      alert(JSON.stringify(values));
      const newItem = await onSubmitProps(values);
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };


  const onChangeField = (name: string, newValue?: any) => {
    formik.setFieldValue(name, newValue);
  };
  const onChangeContent = (value: string, delta, _, editor: UnprivilegedEditor) => {
    const isEmpty = value === VALUE_AS_EMPTY;
    setContent(isEmpty ? "" : value);
    editorRef.current = editor;
  };
  const onChangeAttactment = (files: File[]) => {
    setFiles(files);
  };
  const createSlugFromTitle = (title) => {
    const slug = title.toLowerCase().replace(/ /g, '-');
    return slug;
  };
  const handleChangeTitle = (event) => {
    const nameValue = event.target.value;
    const slugValue = createSlugFromTitle(nameValue);
    formik.setFieldValue('title', nameValue);
    formik.setFieldValue('slug', slugValue);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const onChangeBackGround = (name: string, newValue?: any) => {
    formik.setFieldValue(name, newValue);
  };
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

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<BlogData>, [key, error]) => {
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
      submitText={`${label} ${blogT("blogForm.key")}`}
      cancelText={commonT("form.cancel")}
      submitting={formik.isSubmitting}
      onSubmit={formik.handleSubmit}
      {...rest}
      disabled={disabled}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Stack>
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  error={error?.message}
                  {...field}
                  // onChange={(e) => {
                  //   handleChangeTitle(e);
                  //   formik.handleChange(e);
                  // }}
                  title={blogT(`${blogFormTranslatePrefix}.title`)}
                  rootSx={sxConfig.input}
                />
              )}
            />
            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  error={error?.message}
                  {...field}
                  title={blogT(`${blogFormTranslatePrefix}.slug`)}
                  rootSx={sxConfig.input}
                />
              )}
            />

            <Stack>
              <Controller
                control={control}
                name="category"
                render={({ field, fieldState: { error } }) => (

                  <SelectCategories
                    name="category"
                    value={formik.values?.category}
                    onChange={onChangeField}
                    ignoreId={formik.values?.ignoredId}
                  />
                )}
              />
            </Stack>
            <Controller
              control={control}
              name="tag"
              render={({ field, fieldState: { error } }) => {
                const { onChange, ...props } = field;
                const onSelect = (e, data) => {
                  const mappingData = data.map((item) => item.value);
                  onChange(mappingData);
                };
                const onEnter = (value: string | undefined) => {
                  if (!value) return;
                  const tags = getValues("tag") ?? [];
                  const isExisted = tagsOptions.find(
                    (item) => item.label === value,
                  );
                  const convertedTags = tags.map((item) => {
                    return {
                      label: item,
                      value: item,
                    };
                  });
                  if (isExisted) {
                    onSelect(null, [
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
                  // setValue("tags", [...tags, isExisted.value]);
                  // onSelect(null, cno);
                };
                return (
                  <SelectMultiple limitTags={3}
                    options={tagsOptions}
                    onSelect={onSelect}
                    error={error?.message}
                    onInputChange={(value) => onSearchTags(value)}
                    onEnter={onEnter}
                    label={blogT("blogForm.tags")}
                    sx={sxConfig}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="background"
              render={({ field, fieldState: { error } }) => (
                <UploadFile
                  title={blogT("blogForm.background")}
                  name="background"
                  value={formik.values?.background}
                  onChange={onChangeBackGround}
                />

              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Stack height={300}>
            <Controller control={control}
              name="content"
              render={({ field, fieldState: { error } }) => (
                <Editor
                  hasAttachment
                  placeholder={blogT("blogForm.content")}
                  onChange={onChangeContent}
                  onChangeFiles={onChangeAttactment}
                  value={content}
                  files={files}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                  </Stack>
                </Editor>
              )}
            />
          </Stack>
        </Grid>
      </Grid>

    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("form.error.required"),
  content: Yup.string().trim().required("form.error.required"),
  slug: Yup.string().trim().required("form.error.required"),

});

const sxConfig = {
  input: {
    height: 50,
  },
};
const VALUE_AS_EMPTY = "<p><br></p>";
