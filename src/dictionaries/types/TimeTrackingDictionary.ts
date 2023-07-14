export type TimeTrackingDictionary = {
  header: {
    tab: {
      myTime: string;
      companyTime: string;
      workLog: string;
      workTime: string;
      breakTime: string;
      weekly_total: string;

    };
  };
  myTime: {
    addButton: string;
    search: string;
    timesheet: string;
    timesheet_tab: {
      weekly_summary: string;
      total: string;
      pin: string;
      unpin: string;
    };
    calender: string;
    calender_tab: {
      time_label: string;
      same_time_worker: string;
    };
    day: string;
    day_tab: {
      project: string;
      position: string;
      start_time: string;
      time: string;
      note: string;
    }
  };
  company_time: {
    timesheet: string;
    timesheet_tab: {
      weekly_summary: string;
      total: string;
      pin: string;
      unpin: string;
    };
    table: string;
    table_tab: {
      employee: string;
      project: string;
      position: string;
      start_time: string;
      time: string;
      note: string;
    }
  }
};
