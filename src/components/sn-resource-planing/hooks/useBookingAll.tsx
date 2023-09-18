import { useEffect } from "react";
import { useGetBookingAll } from "store/resourcePlanning/selector";

export const useFetchBookingAll = () => {
  const { bookingAllFilter, getBookingResource } = useGetBookingAll();

  useEffect(() => {
    getBookingResource(bookingAllFilter);
  }, [bookingAllFilter]);
};
