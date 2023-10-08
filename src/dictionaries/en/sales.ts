import { SalesDictionary } from "dictionaries/types/SalesDictionary";

export const SalesLang: SalesDictionary = {
  list: {
    title: "Sales",
    head: {
      title: "Sales | Taskcover",
    },
    filter: {
      decending: "Descending",
      ascending: "Ascending",
    },
    action: {
      deal: "Deal",
      export: "Export",
    },
    newDealForm: {
      title: "New Deal",
      dealName: "Deal Name",
      dealMember: "Deal Member",
      unit: "Unit",
      owner: "Owner",
      tags: "Tags",
      submit: "Create Deal",
    },
    table: {
      stage: "Stage",
      pjRevenue: "PJ Revenue",
      revenue: "Revenue",
      time: "Time",
      owner: "Owner",
      probability: "Probability",
      lastActivity: "Last Activity",
    },
    stage: {
      lead: "Lead",
      proposalSent: "Proposal Sent",
      prospect: "Prospect",
      waitingApprove: "Waiting Approve",
      negotiation: "Negotiation",
    },
    exportView: {
      title: "Export View",
      documentFormat: "Document Format",
      orientation: "Orientation",
      pagesize: "Page size",
    },
  },
  detail: {
    tab: {
      feed: "Feed",
      assign: "Assign",
      service: "Service",
    },
    todoList: {
      assign: "Assign",
      title: "Todo List",
      addTodo: "Add Todo",
      dueDate: "Due Date",
      addNew: "Add new",
    },
    service: {
      title: "Service",
      table: {
        name: "Service Name",
        price: "Price",
        quantity: "Quantity",
        billType: "Bill Type",
        discount: "Discount",
        estimate: "Estimate",
        markup: "Markup",
        serviceType: "Service Type",
        totalBuget: "Total Buget",
        unit: "Unit",
        description: "Description",
      },
      billType: {
        fix: "Fix",
        actual: "Actual",
        nonBillable: "Non Billable",
      },
      addNewFromRateCard: "Add new from rate card",
      addNewRow: "Add new row",
      addSection: "Add section",
      duplicate: "Duplicate",
      showDiscount: "{isShow} Discount",
      showMarkup: "{isShow} Markup",
      showFixedPrice: "{isShow} Fixed Price",
      showEstimate: "{isShow} Estimate",
      ShowDescription: "{isShow} Description",
    },
    comment: {
      title: "Wrrite your comment",
      placeholder: "write something on comment",
      show: {
        title: "Show",
        change: "Change",
        comments: "Comments",
        attachment: "Attachment",
      },
      submit: "Submit",
    },
  },
};
