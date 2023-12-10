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
    projectCode: "Mã dự án",
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
    budget: "Chi phí",
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
    listFile: {
      title: "Danh sách các tệp",
      filter: {
        all: "Tất cả",
        file: "Tệp",
        image: "Ảnh",
      },
      noData: "Không có tệp nào",
    },
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
        expectCompletionTime: "Thời gian dự kiến hoàn thành(giờ)",
        timeTaken: "Thời gian đã thực hiện(giờ)",
        name: "Tên công việc",
        oldTaskList: "Danh mục công việc hiện tại",
        newTaskList: "Danh mục công việc chuyển tới",
        newTaskPlace: "Vị trí di chuyển tới",
      },
    },
    addNewTask: "Thêm công việc mới",
    addNewSubTask: "Thêm công việc con mới",
    addNewSubTaskPlaceholder: "Thêm công việc con mới",
    createNewTaskList: "Thêm mới danh mục",
    newMove: "Di chuyển tới",
    taskList: "Danh mục công việc",
    key: "công việc",
    moveTaskList: "Di chuyển danh mục công việc",
    duplicateName: "{name} sao chép lúc {value}",
    selectedCount: "{value} đã chọn",
    assignee: "Người được giao",
    processingDuplicate: "Hệ thống đang xử lý sao chép...",
    nameWillBeExisted:
      "Tên công việc con bị trùng nhau, vui lòng đổi tên nó trước khi di chuyển.",
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
    addDescription: "Thêm mô tả",
    addAttachments: "Thêm đính kèm",
    addDependencies: "Thêm phụ thuộc",
    addSubTasks: "Thêm công việc con",
    addToDos: "Thêm các điều cần làm",
    attachments: "Tệp đính kèm",
    clickToUploadFile: "Nhấn hoặc kéo thả để tải lên các tệp",
    subTasks: "Công việc con",
    setDueDate: "Đặt ngày đến hạn",
    convertToTask: "Chuyển đổi thành công việc",
    convertToSubTask: "Chuyển đổi thành công việc con",
    changeParentTask: "Đổi công việc cha",
    duplicateSubTask: "Sao chép công việc con",
    toDoList: "Các điều cần lầm",
    dependencies: "Các phụ thuộc",
    blocking: "Chặn",
    waitingOn: "Chờ",
    linkedTo: "Liên kết tới",
    addDependencyTask: "Thêm công việc phụ thuộc",
    manual: "Ban đầu",
    commentList: "Danh sách bình luận",
    showMore: "Hiện thêm",
    showLess: "Ẩn bớt",
    form: {
      title: {
        newTask: "Công việc chuyển đến",
      },
    },
    notification: {
      assignSuccess: "Giao công việc cho thành viên thành công!",
      dateSuccess: "Thay đổi thời gian thành công",
    },
  },
  detailActivities: {
    head: {
      title: "Hoạt động dự án | Taskcover",
    },
  },
  budget: {
    head: {
      title: "Chi phí của dự án | Taskcover",
    },
    action: {
      addBudget: "Thêm chi phí",
      addBudgetTitleModal: "Thêm chi phí mới",
    },
    form: {
      name: "Tên",
      start_date: "Ngày bắt đầu",
      end_date: "Ngày kết thúc",
      owner: "Người tạo",
      project_id: "Project ID",
    },
    createBudgetSuccess: "Thêm chi phí mới thành công",
    table: {
      budget: "Status/Budget",
      owner: "Người tạo",
      cost: "Chi phí",
      budgetTimeUsed: "Thời gian đã dùng",
      budgetedTimeUse: "Budgeted Time Usage",
      workTime: "Work Time",
      estimateTime: "Estimate Time",
      revenue: "Revenue",
      margin: "Marin",
      budgetUsed: "Budget Used",
      budgetTotal: "Budget Total",
      workedTime: "Worked Time",
      billableTime: "Billabel Time",
      invoiced: "Invoiced",
      company: "Company",
      project: "Project",
    },
    groupBy: {
      dateCreated: "Ngày tạo",
      dateUpdated: "Ngày cập nhật",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      owner: "Người tạo",
      status: "Trạng thái",
    },
    filter: {
      owner: "Người tạo",
      time: "Thời gian",
    },
    titleGroupBy: "Group By",
    titleFilter: "Lọc",
  },
  errors: {
    form: {
      add_sub_task: {
        required: "Tên công việc không được trống",
      },
    },
  },
};
