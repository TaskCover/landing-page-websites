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
      success: "{prefix} project successfully!",
      invalidPositions:
        "The member list has one or more members with invalid positions!",
      choosePositionFirst:
        "You need to choose an position for this member first!",
    },
  },
};
