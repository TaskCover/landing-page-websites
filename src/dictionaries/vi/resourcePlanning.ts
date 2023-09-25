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
      descending: "Giảm dần theo giờ làm",
      asceding: "Tăng dần theo giờ làm",
    },
    time: {
      eventTime: "{allocation}{unit} cho {day} ngày",
      thisWeek: "Tuần này",
    },
    resourceHeader: {
      available: "Khả dụng",
      schedule: "Lịch trình",
    },
    unit: {
      day: "ngày",
      hour: "giờ",
    },
    unitSymbol: {
      day: "ngày",
      hour: "h",
    },
    action: {
      addBooking: "Thêm lịch",
    },
  },
  form: {
    title: "Quản lý lịch trình",
    selectTimeOffCategory: "Chọn loại nghỉ phép",
    project: "Dự án",
    timeoff: "Nghỉ phép",
    detail: "Xem chi tiết lịch trình",
    role: "Vai trò",
    dateRange: "Khoảng thời gian",
    createBooking: "Tạo lịch",
    allocation: "Phân bổ",
    note: "Ghi chú",
    leftToSchedule: "Còn lại để lên lịch",
    estimate: "Ước tính",
    work: "Giờ làm",
    schedule: "Lên lịch",
  },
};
