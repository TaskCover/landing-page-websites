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
      },
    },
    addNewTask: "Add new task",
    taskList: "Task list",
    notification: {
      taskListSuccess: "{label} task list successfully!",
      taskSuccess: "{label} task successfully!",
    },
  },
};
