import { Button, Stack } from "@mui/material";
import { NS_COMMON } from "constant/index";
import EditIcon from "icons/EditIcon";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import { EditContext } from "../../context/EditContext";
import useBreakpoint from "hooks/useBreakpoint";
import useServiceHeader from "../../../../hooks/useServiceHeader";
import { useFormContext } from "react-hook-form";

const ServiceHeader = () => {
  const commonT = useTranslations(NS_COMMON);
  const { isMdSmaller } = useBreakpoint();
  const { isEdit, setEdit } = useContext(EditContext);
  const { handleSubmit } = useFormContext();
  const { onSaveChange, onCancel } = useServiceHeader();
  return (
    <Stack direction="row" justifyContent={isEdit ? "flex-end" : "flex-start"}>
      {!isEdit ? (
        <Stack>
          <Button
            variant="contained"
            size="medium"
            startIcon={
              <EditIcon
                sx={{
                  width: 16,
                  height: 16,
                  color: "inherit",
                }}
              />
            }
            onClick={() => setEdit && setEdit(true)}
          >
            {commonT("edit")}
          </Button>
        </Stack>
      ) : (
        !isMdSmaller && (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onCancel}>
              {commonT("form.cancel")}
            </Button>
            <Button onClick={handleSubmit(onSaveChange)} variant="contained">
              {commonT("form.save")}
            </Button>
          </Stack>
        )
      )}
    </Stack>
  );
};

export default ServiceHeader;
