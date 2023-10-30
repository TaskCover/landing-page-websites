import React, { useState, useEffect, useMemo, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Tab,
  Tooltip,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DefaultPopupLayout from "layouts/DefaultPopupLayout";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import ProjectTab from "./ProjectTab";
import TimeOffTab from "./TimeoffTab";
import { Button, Text } from "components/shared";
import SplitIcon from "icons/SplitIcon";
import TrashIcon from "icons/TrashIcon";
import DuplicateIcon from "icons/DuplicateIcon";
import { useEditAction } from "components/sn-resource-planing/hooks/useBookingAll";
import { useBookingAll } from "store/resourcePlanning/selector";
import { IBookingItem } from "store/resourcePlanning/reducer";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import RepeatIcon from "icons/RepeatIcon";
interface IProps {
  open: boolean;
  onClose(): void;
  bookingId: string;
  isProject: boolean;
}

const EditBooking: React.FC<IProps> = ({
  open,
  onClose,
  bookingId,
  isProject,
}) => {
  const [activeTabs, setActiveTabs] = useState(isProject ? "1" : "2");
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const commonT = useTranslations(NS_COMMON);
  const { bookingAll, isLoading } = useBookingAll();
  const { handleSplit } = useEditAction();
  useEffect(() => {
    if (open) {
      setActiveTabs(isProject ? "1" : "2");
    }
  }, [isProject, open]);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabs(newValue);
  };

  const bookingEvent: IBookingItem = useMemo(() => {
    const booking =
      bookingAll
        .find((item) => item.bookings.find((i) => i.id === bookingId))
        ?.bookings.find((i) => i.id === bookingId) || ({} as IBookingItem);
    if (booking.booking_type !== RESOURCE_EVENT_TYPE.PROJECT_BOOKING) {
      return {} as IBookingItem;
    }
    return booking;
  }, [JSON.stringify(bookingAll), bookingId]);

  const onHandleSplit = async () => {
    await handleSplit(bookingId, bookingEvent).finally(() => {
      onClose();
    });
  };
  const _renderMain = () => {
    return (
      <DialogContent>
        <TabContext value={activeTabs}>
          <TabList
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: "16px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              },
              "& .MuiTab-root": {
                textTransform: "unset",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: 600,
                color: "rgba(153, 153, 153, 1)",
                "&.active": {
                  color: "#3699FF",
                },
              },
            }}
          >
            <Tab
              label={resourceT("form.project")}
              value="1"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 600,
                color: "gray.300",
                px: "32px",
                py: "14px",
              }}
            />
            <Tab
              label={resourceT("form.timeoff")}
              value="2"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                color: "gray.300",
                fontWeight: 600,
              }}
            />
          </TabList>
          <TabPanel value="1" sx={{ p: 0 }}>
            <ProjectTab bookingId={bookingId} open={open} onClose={onClose} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <TimeOffTab open={open} onClose={onClose} bookingId={bookingId} />
          </TabPanel>
        </TabContext>
      </DialogContent>
    );
  };

  const _renderTitle = () => {
    return (
      <Stack>
        <Text
          sx={{
            fontSize: "18px",
            lineHeight: "21px",
            fontWeight: 600,
            mr: "auto",
          }}
        >
          {resourceT("form.editBooking")}
        </Text>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Tooltip
            title={resourceT("form.editActions.split")}
            placement="top"
            arrow
          >
            <Button
              onClick={() => onHandleSplit()}
              variant="text"
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              size="extraSmall"
              sx={{
                maxWidth: "fit-content",
                height: "fit-content",
                color: "text.primary",
                "&.MuiButton-root": {
                  padding: "6px",
                },
                "&.MuiButton-text:hover": {
                  color: "text.primary",
                  textAlign: "center",
                },
              }}
            >
              <SplitIcon width={30} height={30} fontSize="small" />
            </Button>
          </Tooltip>
          <Tooltip
            title={resourceT("form.editActions.repeat")}
            placement="top"
            arrow
          >
            <Button
              variant="text"
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              size="extraSmall"
              sx={{
                maxWidth: "fit-content",
                height: "fit-content",
                color: "text.primary",
                "&.MuiButton-root": {
                  padding: "6px",
                },
                "&.MuiButton-text:hover": {
                  color: "text.primary",
                  textAlign: "center",
                },
              }}
            >
              <RepeatIcon width={30} height={30} fontSize="small" />
            </Button>
          </Tooltip>
          <Tooltip
            title={resourceT("form.editActions.duplicate")}
            placement="top"
            arrow
          >
            <Button
              variant="text"
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              size="extraSmall"
              sx={{
                maxWidth: "fit-content",
                height: "fit-content",
                color: "text.primary",
                "&.MuiButton-root": {
                  padding: "6px",
                },
                "&.MuiButton-text:hover": {
                  color: "text.primary",
                  textAlign: "center",
                },
              }}
            >
              <DuplicateIcon width={30} height={30} fontSize="small" />
            </Button>
          </Tooltip>
          <Tooltip
            title={resourceT("form.editActions.delete")}
            placement="top"
            arrow
          >
            <Button
              variant="text"
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              size="extraSmall"
              sx={{
                maxWidth: "fit-content",
                height: "fit-content",
                color: "text.primary",
                "&.MuiButton-root": {
                  padding: "6px",
                },
                "&.MuiButton-text:hover": {
                  color: "text.primary",
                  textAlign: "center",
                },
              }}
            >
              <TrashIcon width={30} height={30} fontSize="small" />
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    );
  };

  return (
    <DefaultPopupLayout
      title={_renderTitle()}
      content={_renderMain()}
      open={open}
      onClose={onClose}
      sx={{
        maxWidth: "576px",
        "& > .MuiStack-root": {
          height: "100px",
          alignItems: "flex-start",
        },
      }}
    />
  );
};

export default EditBooking;
