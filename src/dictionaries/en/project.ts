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
      title: "Project Members | Taskcover",
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
      title: "Project Tasks | Taskcover",
    },
    form: {
      title: {
        expectCompletionTime: "Expect completion time",
        timeTaken: "Time taken",
        name: "Task name",
        oldTaskList: "Current task list",
        newTaskList: "New task list",
      },
    },
    addNewTask: "Add new task",
    taskList: "Task list",
    key: "task",
    moveTaskList: "Move task list",
    duplicateName: "{name} copy at {value}",
    selectedCount: "{value} selected items",
    assignee: "Assignee",
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
    notification: {
      assignSuccess: "Assign task successfully!",
    },
  },
};
