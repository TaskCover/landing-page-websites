export type ManagerDictionary = {
  companyList: {
    head: {
      title: string;
    };
    title: string;
    staffPaid: string;
    totalStaff: string;
    approve: string;
    reject: string;
    approved: string;
    rejected: string;
    company: string;
    confirm: {
      title: string;
      content: string;
    };
  };
  employeeList: {
    head: {
      title: string;
    };
    title: string;
    staffPaid: string;
    staffUnpaid: string;
    company: string;
    confirm: {
      title: string;
      content: string;
    };
  };
};
