import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const PinActiveIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#E1F0FF" />
      <path
        d="M16.1596 13.4243V12.7431L17.4038 11.4999C18.2089 11.4018 19.0903 10.8444 19.6121 10.3227C19.7147 10.2201 19.7724 10.0808 19.7724 9.93566C19.7724 9.79049 19.7147 9.65126 19.6121 9.54861L14.4514 4.38795C14.3488 4.2853 14.2095 4.22763 14.0644 4.22763C13.9192 4.22763 13.78 4.2853 13.6773 4.38795C13.1556 4.90969 12.5977 5.79165 12.5002 6.59723L11.2575 7.83991H10.5763C9.81007 7.83794 9.05107 7.98794 8.34321 8.28124C7.63535 8.57454 6.99268 9.0053 6.4524 9.54861C6.35063 9.65173 6.29357 9.79078 6.29357 9.93566C6.29357 10.0805 6.35063 10.2196 6.4524 10.3227L9.67781 13.5481L6.96847 16.2575C6.86582 16.3601 6.80815 16.4993 6.80815 16.6445C6.80815 16.7897 6.86582 16.9289 6.96847 17.0316C7.07112 17.1342 7.21034 17.1919 7.35552 17.1919C7.50069 17.1919 7.63991 17.1342 7.74257 17.0316L10.4519 14.3222L13.6773 17.5476C13.78 17.6503 13.9192 17.708 14.0644 17.708C14.2095 17.708 14.3488 17.6503 14.4514 17.5476C14.9946 17.0074 15.4253 16.3648 15.7185 15.657C16.0117 14.9493 16.1616 14.1904 16.1596 13.4243ZM7.63574 9.95785C8.47105 9.29266 9.50796 8.93173 10.5758 8.93449L11.483 8.93552C11.6281 8.93561 11.7674 8.87807 11.8701 8.77554L13.4188 7.22579C13.4696 7.17501 13.51 7.11467 13.5374 7.04824C13.5649 6.98182 13.5789 6.91062 13.5788 6.83875C13.5788 6.51156 13.7914 6.0151 14.0974 5.58419L18.4153 9.90211C17.9844 10.2071 17.4874 10.4213 17.1592 10.4213C17.0141 10.4212 16.8749 10.4787 16.7722 10.5813L15.224 12.1295C15.1213 12.2322 15.0635 12.3715 15.064 12.5165L15.0645 13.4243C15.0674 14.4921 14.7064 15.529 14.0412 16.3643L7.63574 9.95785Z"
        fill="#3699FF"
      />
    </SvgIcon>
  );
};

export default memo(PinActiveIcon);
