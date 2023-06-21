import { CommonDictionary } from "dictionaries/types/CommonDictionary";

export const CommonLang: CommonDictionary = {
  app: {
    title: "Taskcover",
    description: "Description for Taskcover",
  },
  form: {
    error: {
      required: "{name} is required.",
      invalid: "{name} is invalid.",
      minAndMax: "{name} must be between {min} and {max} characters.",
      confirmNotMatch: "{name} does not match.",
      notSame: "{name} cannot be the same as the {name2}.",
      existed: "{name} already exists in the system.",
      notExist: "{name} does not exist in the system.",
      incorrect: "{name} is incorrect.",
    },
    title: {
      upload: "Upload",
      uploadImage: "Upload",
    },
    confirm: "Confirm",
    cancel: "Cancel",
  },
  notification: {
    imageTypeInvalid:
      "File type is invalid. Currently the system only support PNG, JPEG, JPG",
  },
  error: {
    anErrorTryAgain: "An error occurred. Please try again.",
    anErrorTryReload: "An error occurred. Please try reload page.",
    noData: "No data.",
  },
  position: "Position",
  fullName: "Full name",
  phone: "Phone number",
};
