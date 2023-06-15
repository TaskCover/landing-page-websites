export type MenuItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subs?: MenuItemProps[];
};
