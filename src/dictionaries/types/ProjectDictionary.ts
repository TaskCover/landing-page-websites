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
};
