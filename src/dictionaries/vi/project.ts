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
      success: "{label} dự án thành công!",
      invalidPositions:
        "Danh sách thành viên có một hoặc nhiều thành viên có vị trí không hợp lệ!",
      choosePositionFirst: "Bạn cần chọn chức vụ cho thành viên này trước!",
    },
  },

  tabList: {
    tasks: "Công việc",
    activities: "Hoạt động",
    costHistory: "Lịch sử chi phí",
    members: "Thành viên",
    information: "Thông tin",
  },
  detail: {
    head: {
      title: "Thông tin dự án",
    },
    changeStatus: "Đổi trạng thái",
    changeStatusProject: "Đổi trang thái dự án",
    save: "lưu",
    unSave: "bỏ lưu",
    confirmChangeSaveStatus: {
      title: "Xác nhận thay đổi trạng thái lưu",
      content: "Ban có chắc chắn muốn {value}?",
    },
    notification: {
      changeStatusSuccess: "Cập nhật trạng thái thành công!",
      changeSaveStatusSuccess: "Cập nhật trạng thái lưu thành công!",
    },
    workingHoursActual: "Số giờ làm việc thực tế",
    costSpent: "Chi phí chi trả thực tế",
  },
  detailMembers: {
    head: {
      title: "Thành viên dự án | Taskcover",
    },
    member: "Thành viên",
    hoursWorked: "Số giờ đã làm",
    dateAddedProject: "Ngày thêm vào dự án",
    addMember: "Thêm thành viên",
    addMembersToProject: "Thêm thành viên vào dự án",
    removeFromProject: "Loại bỏ thành viên",
    confirmRemove: {
      title: "Xác nhận loại bỏ thành viên",
      content: "Bạn có chắc chắn muốn loại bỏ thành viên này khỏi dự án?",
    },
    notification: {
      updateSuccess: "Cập nhật danh sách thành viên thành công!",
      removeSuccess: "Loại bỏ thành viên thành công!",
    },
  },
  detailTasks: {
    head: {
      title: "Công việc dự án | Taskcover",
    },
    form: {
      title: {
        expectCompletionTime: "Thời gian dự kiến hoàn thành",
        timeTaken: "Thời gian đã thực hiện",
        name: "Tên công việc",
        oldTaskList: "Danh mục công việc hiện tại",
        newTaskList: "Danh mục công việc chuyển tới",
      },
    },
    addNewTask: "Thêm công việc mới",
    taskList: "Danh mục công việc",
    key: "công việc",
    moveTaskList: "Di chuyển danh mục công việc",
    duplicateName: "{name} sao chép lúc {value}",
    selectedCount: "{value} đã chọn",
    assignee: "Người được giao",
    keys: {
      owner: "người phụ trách",
      start_date: "ngày bắt đầu",
      end_date: "ngày đến hạn",
      status: "trạng thái",
    },
    confirmDeleteTaskList: {
      title: "Xác nhận xóa danh mục công việc",
      content: "Bạn chắc chắn muốn xóa danh mục này {name}?",
    },
    confirmDeleteTasks: {
      title: "Xác nhận xóa công việc",
      content: "Bạn chắc chắn muốn xóa các công việc được chọn?",
    },
    resetSelected: "Nhấn để bỏ đánh dấu tất cả",
    noTasksToMove: "Không có bất kỳ công việc lớn nào để di chuyển",
    notification: {
      taskListSuccess: "{label} danh mục công việc thành công!",
      taskSuccess: "{label} công việc thành công!",
      moveSuccess: "Di chuyển danh sách công việc thành công!",
      duplicateSuccess: "Sao chép công việc thành công!",
      deleteTaskListSuccess: "Xóa danh mục công việc thành công!",
      deleteTasksSuccess: "Xóa công việc thành công!",
      actionTaskSuccess: "Cập nhật {label} công việc thành công!",
    },
  },
  taskDetail: {
    title: "Thông tin chi tiết công việc",
    tabList: {
      detail: "Chi tiết",
      history: "Lịch sử thay đổi",
    },
    assignTask: "Giao công việc",
    changeStatusTask: "Đổi trang thái công việc",
    writeComment: "Viết bình luận...",
    sendComment: "Gửi bình luận",
    notification: {
      assignSuccess: "Giao công việc cho thành viên thành công!",
    },
  },
};
