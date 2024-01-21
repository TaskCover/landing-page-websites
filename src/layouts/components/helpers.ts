import { Permission } from "constant/enums";

export type MenuItemProps = {
  label: string;
  href?: string;
  child?: Array<{ icon: string, label: string, link: string }>
};
