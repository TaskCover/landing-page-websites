export default interface ResourceDictionary {
  header: {
    title: string;

    tab: {
      allPeople: string;
      mySchedule: string;
    };
  };
  schedule: {
    filter: {
      search: string;
      workingHours: string;
      status: {
        active: string;
        pending: string;
        inactive: string;
      };
    };
    time: {
      eventTime: string;
      thisWeek: string;
    };
    unit: {
      day: string;
      hour: string;
    };
    unitSymbol: {
      day: string;
      hour: string;
    };
    resourceHeader: {
      available: string;
      schedule: string;
    };
    action: {
      addBooking: string;
    };
  };
  form: {
    title: string;

    project: string;
    timeoff: string;

    detail: string;
    role: string;
    dateRange: string;
    createBooking: string;
    allocation: string;
    note: string;
    leftToSchedule: string;
    estimate: string;
    work: string;
    schedule: string;
    selectTimeOffCategory: string;
  };
}
