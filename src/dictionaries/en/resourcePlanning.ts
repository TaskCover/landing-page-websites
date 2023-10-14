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
      descending: "Descending by working hours",
      asceding: "Ascending by working hours",
    },
    unit: {
      day: "day",
      hour: "hour",
    },
    unitSymbol: {
      day: "d",
      hour: "h",
    },
    time: {
      eventTime: "{allocation}{unit} for {day} days",
      thisWeek: "This week",
    },
    resourceHeader: {
      available: "Available",
      schedule: "Schedule",
    },
    action: {
      addBooking: "Add booking",
      editBooking: "Edit booking",
    },
    toolTip: {
      resolveBooking: "Resolve overbooking",
      splitBooking: "Split booking",
      duplicateBooking: "Duplicate booking",
      openBudget: "Open budget 'Administration'",
      deleteOverBooking: "Delete overbooking",
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
    timeOffType: {
      vacation: "Vacation",
      sick: "Sick leave",
      other: "Not available",
    },
    timeOffCategory: "Time off category",
    createSuccess: "Create booking successfully",
    createFailed: "Create booking failed",
    editBooking: "Edit booking",
    updateSuccess: "Update booking successfully",
    updateFailed: "Update booking failed",
  },
};
