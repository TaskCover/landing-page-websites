import { Box } from "@mui/material";
import { ServiceAreaTotal } from "./Services/ServiceAreaTotal";
import { ServiceAreaSection } from "./Services/ServiceAreaSection";
import { ServiceSection } from "./Services/ServiceSection";

type Props = {
  isEdit?: boolean;
  onCloseEdit?: () => void;
};

export const Service = ({ isEdit = false, onCloseEdit }: Props) => {
  return isEdit ? (
    <ServiceSection onCloseEdit={onCloseEdit} />
  ) : (
    <Box>
      <ServiceAreaTotal />
      <ServiceAreaSection />
    </Box>
  );
};
