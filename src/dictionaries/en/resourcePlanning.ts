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
  form: {
    title: "Resource Planning",
    selectTimeOffCategory: "Select time off category",
    project: "Project",
    timeoff: "Time off",
    detail: "Show booking detail",
    role: "Role",
    dateRange: "Date range",
    createBooking: "Create booking",
    allocation: "Allocation",
    note: "Note",
    leftToSchedule: "Left to schedule",
    estimate: "Estimate",
    work: "Work",
    schedule: "Schedule",
  },
};
