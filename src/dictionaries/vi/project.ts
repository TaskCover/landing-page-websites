import { ProjectDictionary } from "dictionaries/types/ProjectDictionary";

export const ProjectLang: ProjectDictionary = {
  list: {
    head: {
      title: "Quản lý dự án | Taskcover",
    },
    filter: {
      recent: "Dự án gần đây",
      saved: "Dự án đã lưu",
    },
    form: {
      title: {
        estimatedCost: "Chi phí dự kiến",
        estimatedWorkingHours: "Số giờ làm dự kiến",
        logo: "Logo",
        members: "Thành viên",
        projectType: "Loại dự án",
        name: "Tên dự án",
      },
    },
    title: "Quản lý dự án",
    key: "dự án",
    notification: {
      success: "{prefix} dự án thành công!",
      invalidPositions:
        "Danh sách thành viên có một hoặc nhiều thành viên có vị trí không hợp lệ!",
      choosePositionFirst: "Bạn cần chọn chức vụ cho thành viên này trước!",
    },
  },
};
