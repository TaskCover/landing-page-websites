import { ProjectDictionary } from "dictionaries/types/ProjectDictionary";

export const ProjectLang: ProjectDictionary = {
  list: {
    head: {
      title: "Projects Management | Taskcover",
    },
    filter: {
      recent: "Recent project",
      saved: "Saved project",
    },
    form: {
      title: {
        estimatedCost: "Estimated cost",
        estimatedWorkingHours: "Estimated working hours",
        logo: "Logo",
        members: "Members",
        projectType: "Project type",
        name: "Project name",
      },
    },
    title: "Projects Management",
    projectCode: "Project code",
    key: "project",
    notification: {
      success: "{label} project successfully!",
      invalidPositions:
        "The member list has one or more members with invalid positions!",
      choosePositionFirst:
        "You need to choose an position for this member first!",
    },
  },
  tabList: {
    tasks: "Tasks",
    activities: "Activities",
    costHistory: "Cost History",
    members: "Members",
    information: "Information",
  },
  detail: {
    head: {
      title: "Project Information | Taskcover",
    },
    changeStatus: "Change status",
    changeStatusProject: "Change project status",
    save: "save",
    unSave: "un save",
    confirmChangeSaveStatus: {
      title: "Confirm save status change",
      content: "Are you sure to {value}?",
    },
    notification: {
      changeStatusSuccess: "Update status successfully!",
      changeSaveStatusSuccess: "Update saved status successfully!",
    },
    workingHoursActual: "Working hours (actual)",
    costSpent: "Cost spent",
  },
  detailMembers: {
    head: {
      title: "Members Of Project | Taskcover",
    },
    member: "Member",
    hoursWorked: "Hours worked",
    dateAddedProject: "Date added to project",
    addMember: "Add member",
    addMembersToProject: "Add members to project",
    removeFromProject: "Remove from project",
    confirmRemove: {
      title: "Confirm remove member",
      content: "Are you sure you want to remove this member from the project?",
    },
    notification: {
      updateSuccess: "Update members successfully!",
      removeSuccess: "Remove member successfully!",
    },
  },
  detailTasks: {
    head: {
      title: "Tasks of Project | Taskcover",
    },
    form: {
      title: {
        expectCompletionTime: "Working hours (expected)",
        timeTaken: "Hours worked (done)",
        name: "Task name",
        oldTaskList: "Current task list",
        newTaskList: "New task list",
        newTaskPlace: "New move place",
      },
    },
    addNewTask: "Add new task",
    addNewSubTask: "New subtask",
    createNewTaskList: "Create new list",
    newMove: "Move to",
    taskList: "Task list",
    key: "task",
    moveTaskList: "Move task list",
    duplicateName: "{name} copy at {value}",
    selectedCount: "{value} selected items",
    assignee: "Assignee",
    processingDuplicate: "The system is processing duplicate...",
    nameWillBeExisted:
      "Sub task name is existed, please rename before move it.",
    keys: {
      owner: "assigner",
      start_date: "start date",
      end_date: "end date",
      status: "status",
    },
    confirmDeleteTaskList: {
      title: "Confirm to delete task list",
      content: "Are you sure to delete task list {name}?",
    },
    confirmDeleteTasks: {
      title: "Confirm to delete tasks",
      content: "Are you sure to delete these tasks?",
    },
    resetSelected: "Click to reset selected list",
    noTasksToMove: "No any tasks to move",
    notification: {
      taskListSuccess: "{label} task list successfully!",
      taskSuccess: "{label} task successfully!",
      moveSuccess: "Move task list successfully!",
      duplicateSuccess: "Duplicate successfully!",
      deleteTaskListSuccess: "Delete task list successfully!",
      deleteTasksSuccess: "Delete tasks successfully!",
      actionTaskSuccess: "Update {label} task successfully!",
    },
  },
  taskDetail: {
    title: "Task Detail Information",
    tabList: {
      detail: "Detail",
      history: "History",
    },
    assignTask: "Assign task",
    changeStatusTask: "Change task status",
    writeComment: "Write comment...",
    sendComment: "Send comment",
    addDescription: "Add description",
    addAttachments: "Add attachments",
    addDependencies: "Add dependencies",
    addSubTasks: "Add sub tasks",
    addToDos: "Add to-dos",
    attachments: "Attachments",
    clickToUploadFile: "Click or drag & drop to upload files",
    subTasks: "Sub tasks",
    setDueDate: "Set due date",
    convertToTask: "Convert to task",
    convertToSubTask: "Convert to sub task",
    changeParentTask: "Change parent task",
    duplicateSubTask: "Duplicate sub task",
    toDoList: "To do list",
    dependencies: "Dependencies",
    blocking: "Blocking",
    waitingOn: "Waiting on",
    linkedTo: "Linked to",
    addDependencyTask: "Add dependency task",
    manual: "Manual",
    commentList: "Comments",
    seeMore: "See more",
    seeLess: "See less",
    form: {
      title: {
        newTask: "Move to task",
      },
    },
    notification: {
      assignSuccess: "Assign task successfully!",
    },
  },
  detailActivities: {
    head: {
      title: "Activities of Project",
    },
  },
};
