import { CompanyDictionary } from "dictionaries/types/CompanyDictionary";

export const CompanyLang: CompanyDictionary = {
  employees: {
    head: {
      title: "Employees | Taskcover",
    },
    title: "Employees Management",
    expirationDate: "Expiration date",
    paid: "Paid",
    pay: "Pay",
    unPaid: "Unpaid",
    waiting: "Waiting",
    key: "employee",
    isNeedSelect: "No employee selected",
    confirmPayment: {
      title: "Confirm payment",
      content:
        "Are you sure to pay {count, plural, =1 {this item} other {all these items}}?",
    },
    confirmRemove: {
      title: "Confirm remove employee",
      content:
        "Are you sure to remove {count, plural, =1 {this employee} other {these employees}}?",
    },
    notification: {
      success: "{label} employee successfully!",
    },
  },
  costHistory: {
    head: {
      title: "Cost History | Taskcover",
    },
    title: "Cost History",
  },
  positions: {
    head: {
      title: "Positions Management | Taskcover",
    },
    form: {
      title: {
        name: "Position name",
      },
    },
    title: "Positions Management",
    numberOfEmployees: "Number of employees",
    key: "position",
    confirmDelete: {
      title: "Confirm delete position",
      content: "Are you sure to delete this position?",
    },
    notification: {
      success: "{label} position successfully!",
    },
  },
  projectTypes: {
    head: {
      title: "Project Types Management | Taskcover",
    },
    form: {
      title: {
        name: "Project type name",
      },
    },
    title: "Project Types Management",
    key: "project type",
    confirmDelete: {
      title: "Confirm delete project type",
      content: "Are you sure to delete this project type",
    },
    notification: {
      success: "{label} project type successfully!",
    },
  },
  information: {
    head: {
      title: "Company Information | Taskcover",
    },
    form: {
      title: {
        name: "Company name",
        taxCode: "Tax code",
        address: "Address",
      },
    },
    title: "Company Information",
    generalInformation: "General Information",
    detailInformation: "Detail Information",
    ownerOfCompany: "Owner of company",
    ownerEmail: "Owner email",
    numberOfEmployees: "Number of employees",
    numberOfPositions: "Number of positions",
    numberOfProjects: "Number of projects",
    key: "company information",
    notification: {
      success: "Update company information successfully!",
    },
  },
};
