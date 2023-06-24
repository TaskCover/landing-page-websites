export type ProjectDictionary = {
  list: {
    head: {
      title: string;
    };
    filter: {
      recent: string;
      saved: string;
    };
    form: {
      title: {
        estimatedCost: string;
        estimatedWorkingHours: string;
        logo: string;
        members: string;
        projectType: string;
        name: string;
      };
    };
    title: string;
    key: string;
    notification: {
      success: string;
      invalidPositions: string;
      choosePositionFirst: string;
    };
  };
  tabList: {
    tasks: string;
    activities: string;
    costHistory: string;
    members: string;
    information: string;
  };
  detail: {
    head: {
      title: string;
    };
    changeStatus: string;
    changeStatusProject: string;
    save: string;
    unSave: string;
    confirmChangeSaveStatus: {
      title: string;
      content: string;
    };
    notification: {
      changeStatusSuccess: string;
      changeSaveStatusSuccess: string;
    };
    workingHoursActual: string;
    costSpent: string;
  };
  detailMembers: {
    head: {
      title: string;
    };
    member: string;
    hoursWorked: string;
    dateAddedProject: string;
    addMember: string;
    addMembersToProject: string;
    removeFromProject: string;
    confirmRemove: {
      title: string;
      content: string;
    };
    notification: {
      updateSuccess: string;
      removeSuccess: string;
    };
  };
  detailTasks: {
    head: {
      title: string;
    };
    form: {
      title: {
        expectCompletionTime: string;
        timeTaken: string;
        name: string;
        oldTaskList: string;
        newTaskList: string;
      };
    };
    addNewTask: string;
    taskList: string;
    key: string;
    moveTaskList: string;
    notification: {
      taskListSuccess: string;
      taskSuccess: string;
      moveSuccess: string;
    };
  };
  taskDetail: {
    title: string;
    tabList: {
      detail: string;
      history: string;
    };
  };
};
