import { Stack } from "@mui/material";
import ConfirmDialog from "components/ConfirmDialog";
import Loading from "components/Loading";
import { Button, Text, Tooltip } from "components/shared";
import { useEditAction } from "components/sn-resource-planing/hooks/useBookingAll";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import DuplicateIcon from "icons/DuplicateIcon";
import RepeatIcon from "icons/RepeatIcon";
import SplitIcon from "icons/SplitIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
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
  const { handleSplit, handleDelete, handleDuplicate } = useEditAction();
  const { bookingAll, isLoading } = useBookingAll();
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

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

  const onHandleSplit = async (e) => {
    e.stopPropagation();
    await handleSplit(bookingId, bookingEvent).finally(() => {
      onClose();
    });
  };

  const onHandleDelete = async (e) => {
    e.stopPropagation();

    await handleDelete(bookingId).finally(() => {
      onClose();
    });
  };

  const onHandleDuplicate = async (e) => {
    e.stopPropagation();

    await handleDuplicate(bookingId, bookingEvent).finally(() => {
      onClose();
    });
  };

  if (isLoading) {
    return <Loading open />;
  }
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
            onClick={(e) => onHandleSplit(e)}
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
            <DuplicateIcon
              width={30}
              height={30}
              fontSize="small"
              onClick={(e) => onHandleDuplicate(true)}
            />
          </Button>
        </Tooltip>
        <Tooltip
          title={resourceT("form.editActions.delete")}
          placement="top"
          arrow
        >
          <Button
            onClick={(e) => setIsConfirmDelete(true)}
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
      <ConfirmDialog
        onSubmit={(e) => onHandleDelete(e)}
        title={commonT("confirmDelete.title")}
        onClose={() => setIsConfirmDelete(false)}
        open={isConfirmDelete}
        content={commonT("confirmDelete.content")}
      />
    </Stack>
  );
};

export default Title;
