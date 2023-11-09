import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useBookingAll, useMyBooking } from "store/resourcePlanning/selector";

export const useFetchBookingAll = () => {
  const { bookingAllFilter, getBookingResource } = useBookingAll();
  useEffect(() => {
    getBookingResource(bookingAllFilter);
  }, [bookingAllFilter]);
};

export const useFetchMyBooking = () => {
  const { getMyBooking, myBookingFilter } = useMyBooking();

  useEffect(() => {
    getMyBooking(myBookingFilter);
  }, [myBookingFilter]);
};

export const useEditAction = () => {
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const commonT = useTranslations(NS_COMMON);
  const [isLoading, setIsLoading] = useState({
    split: false,
    delete: false,
    duplicate: false,
    repeat: false,
  });
  const { updateBooking, createBooking, deleteBooking } = useBookingAll();
  const { onAddSnackbar } = useSnackbar();
  const handleSplit = async (id, data) => {
    setIsLoading({
      ...isLoading,
      split: true,
    });
    try {
      const { start_date, end_date } = data;
      const middlePointDay = Math.floor(
        (dayjs(end_date).diff(start_date, "days") + 1) / 2,
      );

      if (middlePointDay === 0) {
        onAddSnackbar(resourceT("form.error.split"), "error");
        return;
      }
      const middleDate = dayjs(start_date).add(middlePointDay, "days").toDate();

      const updateFirstDate = createBooking(
        {
          ...data,
          start_date: dayjs(middleDate).format("YYYY-MM-DD"),
        },
        true,
      );
      const updateSecondDate = createBooking(
        {
          ...data,
          end_date: dayjs(middleDate).format("YYYY-MM-DD"),
        },
        true,
      );
      return await Promise.all([updateFirstDate, updateSecondDate])
        .then(async () => {
          await deleteBooking(id, true).then(() => {
            onAddSnackbar(resourceT("form.updateSuccess"), "success");
          });
          // onAddSnackbar(resourceT("form.updateSuccess"), "success");
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          setIsLoading({
            ...isLoading,
            split: false,
          });
        });
    } catch (e) {
      console.log(e);
      onAddSnackbar(commonT("error.anErrorTryAgain"), "error");
    }
  };

  const handleDelete = async (id) => {
    setIsLoading({
      ...isLoading,
      delete: true,
    });
    try {
      await deleteBooking(id)
        .then(() => {
          // onAddSnackbar(resourceT("form.deleteSuccess"), "success");
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          setIsLoading({
            ...isLoading,
            delete: false,
          });
        });
    } catch (e) {
      onAddSnackbar(commonT("error.anErrorTryAgain"), "error");
    }
  };

  const handleDuplicate = async (id, data) => {
    setIsLoading({
      ...isLoading,
      duplicate: true,
    });
    try {
      await createBooking(data)
        .then(() => {
          // onAddSnackbar(resourceT("form.duplicateSuccess"), "success");
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          setIsLoading({
            ...isLoading,
            duplicate: false,
          });
        });
    } catch (e) {
      onAddSnackbar(commonT("error.anErrorTryAgain"), "error");
    }
  };

  const handleRepeat = (id, time, week, data) => {
    while (time--) {
      const newDate = dayjs(week).add(time, "week").toDate();
      createBooking({
        ...data,
        start_date: dayjs(newDate).format("YYYY-MM-DD"),
        end_date: dayjs(newDate).format("YYYY-MM-DD"),
      });
    }
  };
  return {
    handleDelete,
    handleDuplicate,
    handleSplit,
    handleRepeat,
    isLoading,
  };
};
