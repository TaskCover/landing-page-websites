export interface IBookingAllFitler {
  start_date: string;
  end_date: string;
  search_key: string;
}
export enum resourceActionType {
  SET_BOOKING_ALL_FILTER = "SET_BOOKING_ALL_FILTER",
  SET_DATE_PICKER = "SET_DATE_PICKER",
  SET_CURRENT_DATE = "SET_CURRENT_DATE",
}

export enum WorkingStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}
