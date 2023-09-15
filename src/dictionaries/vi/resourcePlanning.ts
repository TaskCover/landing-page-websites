import ResourceDictionary from "dictionaries/types/ResourceDictionary";

export const ResourcePlanning: ResourceDictionary = {
  header: {
    title: "Quản lý lịch trình",

    tab: {
      allPeople: "Mọi người",
      mySchedule: "Lịch trình của tôi",
    },
  },
  schedule: {
    filter: {
      search: "Tìm tên nhân viên",
      workingHours: "Giờ làm việc",
      status: {
        active: "Đang làm việc",
        pending: "Tạm dừng",
        inactive: "Ngừng làm việc",
      },
    },
    time: {
      eventTime: "8h/ngày cho {day} ngày",
      thisWeek: "Tuần này",
    },
    resourceHeader: {
      available: "Khả dụng",
      schedule: "Lịch trình",
    },
    action: {
      addBooking: "Thêm lịch",
    },
  },
};
