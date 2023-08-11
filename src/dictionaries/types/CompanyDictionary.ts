export type CompanyDictionary = {
  employees: {
    head: {
      title: string;
    };
    title: string;
    expirationDate: string;
    paid: string;
    pay: string;
    unPaid: string;
    waiting: string;
    key: string;
    isNeedSelect: string;
    confirmPayment: {
      title: string;
      content: string;
    };
    confirmRemove: {
      title: string;
      content: string;
    };
    notification: {
      success: string;
    };
  };
  costHistory: {
    head: {
      title: string;
    };
    title: string;
  };
  positions: {
    head: {
      title: string;
    };
    form: {
      title: {
        name: string;
      };
    };
    title: string;
    numberOfEmployees: string;
    key: string;
    confirmDelete: {
      title: string;
      content: string;
    };
    notification: {
      success: string;
    };
  };
  projectTypes: {
    head: {
      title: string;
    };
    form: {
      title: {
        name: string;
      };
    };
    title: string;
    key: string;
    confirmDelete: {
      title: string;
      content: string;
    };
    notification: {
      success: string;
    };
  };
  information: {
    head: {
      title: string;
    };
    form: {
      title: {
        name: string;
        address: string;
        taxCode: string;
      };
    };
    title: string;
    generalInformation: string;
    detailInformation: string;
    ownerOfCompany: string;
    ownerEmail: string;
    numberOfEmployees: string;
    numberOfPositions: string;
    numberOfProjects: string;
    key: string;
    notification: {
      success: string;
    };
  };
};
