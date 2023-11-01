import { Stack } from "@mui/material";
import { Button, Text, Tooltip } from "components/shared";
import { useEditAction } from "components/sn-resource-planing/hooks/useBookingAll";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import DuplicateIcon from "icons/DuplicateIcon";
import RepeatIcon from "icons/RepeatIcon";
import SplitIcon from "icons/SplitIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { IBookingItem } from "store/resourcePlanning/reducer";
import { useBookingAll } from "store/resourcePlanning/selector";

const Title = ({
  bookingId,
  onClose,
}: {
  bookingId: string;
  onClose: () => void;
}) => {
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const commonT = useTranslations(NS_COMMON);
  const { handleSplit, handleDelete } = useEditAction();
  const { bookingAll, isLoading } = useBookingAll();

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

  const onHandleDelete = async () => {
    await handleDelete(bookingId).finally(() => {
      onClose();
    });
  };

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
            onClick={() => onHandleDelete()}
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

export default Title;
