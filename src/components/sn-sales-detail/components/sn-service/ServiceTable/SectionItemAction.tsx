import {
  IconButton,
  MenuList,
  Box,
  MenuItem,
  ButtonBase,
  Stack,
} from "@mui/material";
import PopoverLayout from "components/sn-project-detail/Tasks/Detail/components/SubTasksOfTask/PopoverLayout";
import { NS_COMMON, NS_SALES } from "constant/index";
import MoreSquareIcon from "icons/MoreSquareIcon";
import { useTranslations } from "next-intl";
import React, { useMemo, useRef } from "react";
import { Action } from "../../TodoList/SubItem";
import { Text } from "components/shared";
import CopyIcon from "icons/CopyIcon";
import TrashIcon from "icons/TrashIcon";
import MoreDotIcon from "icons/MoreDotIcon";

type ActionsProps = {
  sectionId: string;
  onChangeAction: (action: Action) => void;
};

const SectionItemAction = (props: ActionsProps) => {
  const { sectionId, onChangeAction } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const options = useMemo(() => {
    return [
      {
        label: salesT("detail.service.showDiscount"),
        value: Action.SHOW_DISCOUNT,
      },
      {
        label: salesT("detail.service.showMarkup"),
        value: Action.SHOW_MARKUP,
      },
      {
        label: salesT("detail.service.showFixedPrice"),
        value: Action.SHOW_FIXED_PRICE,
      },
      {
        label: salesT("detail.service.showEstimate"),
        value: Action.SHOW_ESTIMATE,
      },
      {
        label: salesT("detail.service.ShowDescription"),
        value: Action.SHOW_DESCRIPTION,
      },
      {
        label: commonT("delete"),
        value: Action.DELETE,
        color: "error.main",
      },
    ];
  }, [commonT, salesT]);

  const onAction = (action: Action) => {
    return () => {
      onChangeAction(action);
      buttonRef?.current?.click();
    };
  };

  return (
    <PopoverLayout
      ref={buttonRef}
      label={
        <IconButton>
          <MoreDotIcon sx={{ fontSize: 20 }} />
        </IconButton>
      }
    >
      <MenuList component={Box} sx={{ pb: 0 }}>
        {options.map((option) => (
          <MenuItem
            component={ButtonBase}
            onClick={onAction(option.value)}
            sx={defaultSx.item}
            key={option.value}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Text variant="body2" color={option.color}>
                {option.label}
              </Text>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>
    </PopoverLayout>
  );
};

export default SectionItemAction;

const defaultSx = {
  item: {
    fontSize: 14,
    color: "text.primary",
    lineHeight: "22px",
    width: "100%",
    "& > img": {
      mr: 1,
    },
    "&:hover": {
      backgroundColor: "primary.main",
      "& svg": {
        color: "common.white",
      },
    },
  },
};
