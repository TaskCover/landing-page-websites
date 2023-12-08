import { MenuList, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { useTranslations } from "next-intl";
import { NS_BUDGETING } from "constant/index";
import React, { useEffect } from "react";
import { DatePicker, Input, Select } from "components/shared";
import { useProjects } from "store/project/selectors";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import Textarea from "components/sn-time-tracking/Component/Textarea";

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
};

export const ModalAddTime = ({ open, onClose, projectId }: Props) => {
  const budgetT = useTranslations(NS_BUDGETING);

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();

  useEffect(() => {
    if (!open) return;
    if (!projects || projects.length === 0) {
      onGetProjects({});
    }
  }, [open]);

  const sxInput = {
    height: 58,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
  };

  return (
    <FormLayout
      label={budgetT("dialog.titleModalAdd")}
      pending={false}
      submitWhenEnter={false}
      open={open}
      onClose={onClose}
      cancelText={budgetT("dialog.cancelBtnText")}
      submitText={budgetT("dialog.addBtnText")}
    >
      <Stack overflow="auto">
        <MenuList component={Stack} spacing={2}>
          <DatePicker
            title={budgetT("dialog.date")}
            name="date"
            rootSx={sxInput}
            fullWidth
            onChange={() => {}}
          />
          <Select
            options={projectOptions}
            title={budgetT("dialog.project")}
            name="project_id"
            rootSx={sxInput}
            fullWidth
            value={projectId}
          />
          <Input
            rootSx={sxInput}
            title={budgetT("dialog.timeRanger")}
            fullWidth
            name="name"
          />
          <Stack gap={2} direction="row">
            <Input
              rootSx={sxInput}
              title={budgetT("dialog.startTime")}
              sx={{ width: "50%" }}
              name="name"
            />
            <Input
              rootSx={sxInput}
              title={budgetT("dialog.endTime")}
              sx={{ width: "50%" }}
              name="name"
            />
          </Stack>
          <Textarea name="note" label={budgetT("dialog.note")} />
        </MenuList>
      </Stack>
    </FormLayout>
  );
};
