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
      overMax:
        "{name} is too long, maximum {max, plural, =0 {no characters} =1 {one character} other {# characters}}",
      datePast: "{name} cannot be a date in the past.",
      gte: "{name} must be greater than or equal to {name2}",
    },
    title: {
      upload: "Upload",
      uploadImage: "Upload",
      assigner: "Assigner",
      startDate: "Start date",
      endDate: "End date",
      description: "Description",
    },
    confirm: "Confirm",
    cancel: "Cancel",
  },
  notification: {
    imageTypeInvalid:
      "File type is invalid. Currently the system only support PNG, JPEG, JPG",
    success: "{label} successfully!",
  },
  error: {
    anErrorTryAgain: "An error occurred. Please try again.",
    anErrorTryReload: "An error occurred. Please try reload page.",
  },
  position: "Position",
  fullName: "Full name",
  phone: "Phone number",
  status: "Status",
  filter: {
    refresh: "Refresh data",
    clear: "Clear filters",
    status: {
      active: "Activated",
      close: "Closed",
      pause: "Paused",
    },
  },
  createNew: "Create new",
  update: "Update",
  edit: "Edit",
  delete: "Delete",
  close: "Close",
  search: "Search",
  assigner: "Assigner",
  name: "Name",
  paging: {
    show: "Showing",
    outOf: "per page out of {count}",
  },
  statusEnum: {
    active: "Activated",
    close: "Closed",
    pause: "Paused",
  },
  searchBy: "Search by {name}",
  creationDate: "Creation date",
  creator: "Creator",
  confirmDelete: {
    title: "Confirm delete",
    content: "Are you sure to delete?",
  },
  upgradeAccount: "Upgrade account",
  clickGoDetail: "Click to go to detail {name}",
  waiting: "Waiting",
  approved: "Approved",
  rejected: "Rejected",
  noData: "No data.",
  unauthorized: "Your account does not have permission to access this page!",
};
