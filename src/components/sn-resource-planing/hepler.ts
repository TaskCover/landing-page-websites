import dayjs from "dayjs";
import { WorkingStatus } from "store/resourcePlanning/action";

const today = dayjs().add(1, "day"); // Ngày hiện tại + 1 ngày (ngày mai)
const startOfWeek = today.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
const endOfWeek = today.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

const defaultStartDate = startOfWeek.format("YYYY-MM-DD");
const defaultEndDate = endOfWeek.format("YYYY-MM-DD");

export const DEFAULT_BOOKING_ALL_FILTER = {
  start_date: defaultStartDate,
  end_date: defaultEndDate,
  search_key: "",
  position: "",
  working_sort: WorkingStatus.ALL,
};

export const weekdays = ["SUN", "MON", "TUE", "WEB", "THU", "FRI", "SAT"];

export const EXAMPLE_DATA = [
  {
    id: "camp-1",
    name: "First Project",
    from: dayjs().add(1, "day").toISOString(),
    to: dayjs().add(4, "day").toISOString(),
    steps: [
      {
        id: 1,
        name: "Mail 1/2",
        eventType: "PROJECT_BOOKING",
        from: dayjs().add(1, "day").toISOString(),
        to: dayjs().add(2, "day").toISOString(),
      },
      {
        id: 1,
        name: "Mail 2/2",
        eventType: "PROJECT_BOOKING",
        from: dayjs().add(1, "day").toISOString(),
        to: dayjs().add(3, "day").toISOString(),
      },
    ],
  },
  {
    id: "camp-2",
    name: "Second offtime",
    from: dayjs().add(1, "day").toISOString(),
    to: dayjs().add(5, "day").toISOString(),
    steps: [
      {
        id: 5,
        name: "Mail 1/2",
        eventType: "OFF_TIME",
        from: dayjs().add(1, "day").toISOString(),
        to: dayjs().add(3, "day").toISOString(),
      },
      {
        id: 5,
        name: "Mail 2/2",
        eventType: "OFF_TIME",
        from: dayjs().add(1, "day").toISOString(),
        to: dayjs().add(4, "day").toISOString(),
      },
    ],
  },
];
