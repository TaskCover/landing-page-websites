import { useEffect } from "react";
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
