import { Button, Stack } from "@mui/material";
import { NS_COMMON } from "constant/index";
import EditIcon from "icons/EditIcon";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import { EditContext } from "../../context/EditContext";
import useServiceHeader from "../../../../hooks/useServiceHeader";

const ServiceHeaderMobile = () => {
  const commonT = useTranslations(NS_COMMON);
  const { isEdit, setEdit } = useContext(EditContext);
  const { onSaveChange } = useServiceHeader();

  return (
    <Stack direction="row" justifyContent={isEdit ? "flex-end" : "flex-start"}>
      {isEdit && (
        <Stack direction="row" spacing={2} width="100%">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setEdit && setEdit(false)}
          >
            {commonT("form.cancel")}
          </Button>
          <Button onClick={onSaveChange} fullWidth variant="contained">
            {commonT("form.save")}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default ServiceHeaderMobile;
