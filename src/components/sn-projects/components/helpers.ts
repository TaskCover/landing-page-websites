import { AlertColor } from "@mui/material";
import { ProjectStatus } from "store/project/actions";

export const TEXT_STATUS: { [key in ProjectStatus]: string } = {
  [ProjectStatus.ACTIVE]: "statusEnum.active",
  [ProjectStatus.PAUSE]: "statusEnum.pause",
  [ProjectStatus.CLOSE]: "statusEnum.close",
};

export const COLOR_STATUS: { [key in ProjectStatus]: AlertColor } = {
  [ProjectStatus.ACTIVE]: "success",
  [ProjectStatus.PAUSE]: "warning",
  [ProjectStatus.CLOSE]: "error",
};

export type Member = {
  id: string;
  fullname: string;
};

export const INITIAL_VALUES = {
  name: "",
  owner: "",
  start_date: "",
  end_date: "",
  expected_cost: "",
  working_hours: "",
  description: "",
  members: [],
  type_project: "",
};

export const STATUS_OPTIONS = [
  { label: TEXT_STATUS.ACTIVE, value: ProjectStatus.ACTIVE },
  { label: TEXT_STATUS.PAUSE, value: ProjectStatus.PAUSE },
  { label: TEXT_STATUS.CLOSE, value: ProjectStatus.CLOSE },
];
