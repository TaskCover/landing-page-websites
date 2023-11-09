import { CircularProgress, Menu, MenuItem, Stack } from "@mui/material";
import ConfirmDialog from "components/ConfirmDialog";
import Loading from "components/Loading";
import { Button, Input, Select, Text, Tooltip } from "components/shared";
import { useEditAction } from "components/sn-resource-planing/hooks/useBookingAll";
import * as yup from "yup";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import DuplicateIcon from "icons/DuplicateIcon";
import RepeatIcon from "icons/RepeatIcon";
import SplitIcon from "icons/SplitIcon";
import TrashIcon from "icons/TrashIcon";
import { Dropdown } from "@mui/base";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { IBookingItem } from "store/resourcePlanning/reducer";
import { useBookingAll } from "store/resourcePlanning/selector";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "store/app/selectors";
import dayjs from "dayjs";
import { ConstructionOutlined } from "@mui/icons-material";

const Title = ({
  bookingId,
  onClose,
}: {
  bookingId: string;
  onClose: () => void;
}) => {
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const commonT = useTranslations(NS_COMMON);
  const { onAddSnackbar } = useSnackbar();
  const {
    handleSplit,
    handleDelete,
    handleDuplicate,
    isLoading,
    handleRepeat,
  } = useEditAction();
  const { bookingAll } = useBookingAll();
  const [perUnit, setPerUnit] = useState(1);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const bookingEvent: IBookingItem = useMemo(() => {
    const booking =
      bookingAll
        .find((item) => item.bookings.find((i) => i.id === bookingId))
        ?.bookings.find((i) => i.id === bookingId) || ({} as IBookingItem);
    // if (booking.booking_type !== RESOURCE_EVENT_TYPE.PROJECT_BOOKING) {
    //   return {} as IBookingItem;
    // }
    return booking;
  }, [JSON.stringify(bookingAll), bookingId]);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      perUnit: 1,
      unit: "week",
      time: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        perUnit: yup.number().min(0).max(40),
        unit: yup.string(),
        time: yup.number().min(0).max(40),
      }),
    ),
  });

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
    e.stopPropagation && e.stopPropagation();

    await handleDuplicate(bookingId, bookingEvent).finally(() => {
      onClose();
    });
  };

  const onSubmit = async () => {
    if (errors) return;

    const time = getValues("time");
    const perUnit = getValues("perUnit");
    const unit = getValues("unit");

    handleRepeat(time, perUnit, unit, bookingEvent).finally(() => {
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
            onClick={(e) => onHandleSplit(e)}
            variant="text"
            TouchRippleProps={{
              style: {
                display: "none",
              },
            }}
            disabled={isLoading.split}
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
            {isLoading.split ? (
              <CircularProgress size={20} />
            ) : (
              <SplitIcon width={30} height={30} fontSize="small" />
            )}
          </Button>
        </Tooltip>
        <Tooltip
          title={resourceT("form.editActions.repeat")}
          placement="top"
          arrow
        >
          <Button
            id="repeat-button"
            variant="text"
            disabled={isLoading.repeat}
            TouchRippleProps={{
              style: {
                display: "none",
              },
            }}
            onClick={(e) => setIsOpen(!isOpen)}
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
            {isLoading.repeat ? (
              <CircularProgress size={20} />
            ) : (
              <RepeatIcon width={30} height={30} fontSize="small" />
            )}
          </Button>
        </Tooltip>
        <Dropdown open={isOpenDropdown}>
          <Menu
            anchorEl={document.getElementById("repeat-button")}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& > .MuiButtonBase-root:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Stack
              direction="row"
              sx={{
                px: 3,
                py: 1,
              }}
              justifyContent="start"
              alignItems="center"
              gap={1}
            >
              <Text>{resourceT("form.repeatTimes")}</Text>
              <Controller
                name="perUnit"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    sx={{
                      width: "100px",
                      textAlign: "center",
                    }}
                  />
                )}
              />
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      width: "120px",
                      textAlign: "center",
                    }}
                    options={[
                      {
                        label: resourceT("form.week"),
                        value: "week",
                      },
                      {
                        label: resourceT("form.month"),
                        value: "month",
                      },
                    ]}
                  />
                )}
              />
            </Stack>
            <Stack
              direction="row"
              px={3}
              py={1}
              justifyContent="start"
              alignItems="center"
              gap={1}
            >
              <Text>{resourceT("form.repeatTimes")}</Text>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    sx={{
                      width: "100px",
                      textAlign: "center",
                    }}
                  />
                )}
              />
              <Text>
                {resourceT("form.time", {
                  count: watch("time"),
                })}
              </Text>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              pending={isLoading.repeat}
              sx={{
                mx: 3,
                my: 1,
              }}
              onClick={(e) => {
                console.log("onSubmit");
                onSubmit();
              }}
            >
              Create Booking
            </Button>
          </Menu>
        </Dropdown>

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
            disabled={isLoading.duplicate}
            onClick={(e) => onHandleDuplicate(true)}
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
            {isLoading.duplicate ? (
              <CircularProgress size={20} />
            ) : (
              <DuplicateIcon width={30} height={30} fontSize="small" />
            )}
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
        pending={isLoading.delete}
        content={commonT("confirmDelete.content")}
      />
    </Stack>
  );
};

export default React.forwardRef(Title);
