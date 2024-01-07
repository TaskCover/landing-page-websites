/* eslint-disable @typescript-eslint/no-empty-function */
import { Box } from "@mui/material";
import { ServiceAreaTotal } from "./Services/ServiceAreaTotal";
import { ServiceAreaSection } from "./Services/ServiceAreaSection";
import { ServiceSection } from "./Services/ServiceSection";
import { TSection } from "../BudgetDetail";

type Props = {
  isEdit?: boolean;
  services?: TSection[];
  onCloseEdit?: () => void;
  sections: TSection[];
};

export const Service = ({
  isEdit = false,
  sections = [],
  onCloseEdit,
}: Props) => {
  return isEdit ? (
    <ServiceSection onCloseEdit={onCloseEdit} />
  ) : (
    <Box>
      <ServiceAreaTotal />
      <ServiceAreaSection sections={sections} />
    </Box>
  );
};
