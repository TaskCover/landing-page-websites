import { useEffect, useMemo } from "react";
import { Sales } from "store/sales/reducer";
import { useSales } from "store/sales/selectors";
import { useGetMyTimeSheet } from "store/timeTracking/selectors";
import { find } from "lodash";
import { useBookingAll } from "store/resourcePlanning/selector";

export const useCalculateDetail = (
  saleId?: string,
  project_id?: string,
  resourceId?: string,
) => {
  const { sales } = useSales();
  const { bookingAll } = useBookingAll();
  const { onGetMyTimeSheet, params, items: timesheets } = useGetMyTimeSheet();

  const estimate = useMemo(() => {
    const result = find(sales, { id: saleId })?.estimate;
    return result || 0;
  }, [sales, saleId]);

  const workedTime = useMemo(() => {
    return timesheets.reduce((acc, cur) => {
      if (cur.id === project_id) {
        return acc + (cur.duration || 0);
      }
      return acc;
    }, 0);
  }, [timesheets, project_id]);

  const scheduledTime = useMemo(() => {
    const parentResource = bookingAll.find((item) => item.id === resourceId);
    return parentResource?.total_hour || 0;
  }, [bookingAll, resourceId]);

  const leftToSchedule = useMemo(() => {
    return estimate - workedTime - scheduledTime;
  }, [estimate, workedTime, scheduledTime]);

  useEffect(() => {
    onGetMyTimeSheet(params);
  }, []);

  return { estimate, workedTime, scheduledTime, leftToSchedule };
};
