import ResourceDictionary from "dictionaries/types/ResourceDictionary";

export const ResourcePlanningLang: ResourceDictionary = {
  header: {
    title: "Resource Planning",

    tab: {
      allPeople: "All People",
      mySchedule: "My schedule",
    },
  },
  schedule: {
    filter: {
      search: "Name employee",
      workingHours: "Working hours",
      status: {
        active: "Active",
        pending: "Pending",
        inactive: "Inactive",
      },
    },
    time: {
      eventTime: "8h/day for {day} days",
      thisWeek: "This week",
    },
    resourceHeader: {
      available: "Available",
      schedule: "Schedule",
    },
    action: {
      addBooking: "Add booking",
    },
  },
};
