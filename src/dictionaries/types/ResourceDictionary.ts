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
    resourceHeader: {
      available: string;
      schedule: string;
    };
    action: {
      addBooking: string;
    };
  };
}
