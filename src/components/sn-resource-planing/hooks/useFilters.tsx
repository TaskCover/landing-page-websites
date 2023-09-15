import React from "react";
import { DEFAULT_BOOKING_ALL_FILTER } from "../hepler";
import { IBookingAllFitler } from "store/resourcePlanning/action";

const useFilters = () => {
  const [filters, setFilters] = React.useState<IBookingAllFitler>(
    DEFAULT_BOOKING_ALL_FILTER,
  );
};
