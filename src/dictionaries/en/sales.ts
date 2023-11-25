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
      update: "Update Deal",
    },
    table: {
      stage: "Stage",
      pjRevenue: "Project Revenue",
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
    noOptionText: "No option, create new one",
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
      dueDate: "Set Due Date",
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
        position: "Position",
        estTooltip: "Estimate is editable on fixed billing price",
        totalBuget: "Total Buget",
        unit: "Unit",
        description: "Description",
      },
      billType: {
        fix: "Fixed",
        actual: "Actual",
        nonBillable: "Non Billable",
      },
      unit: {
        hour: "Hour",
        hourSubText: "Budget and track in hours",
        day: "Day",
        daySubText: "Budget in days, track in hours",
        piece: "Piece",
        pieceSubText: "Budget in pieces, track hours or expenses",
      },
      addNewFromRateCard: "Add new from rate card",
      addNewRow: "Add new row",
      addSection: "Add section",
      addService: "Add service",
      duplicate: "Duplicate",
      showDiscount: "{isShow} Discount",
      showMarkup: "{isShow} Markup",
      showFixedPrice: "{isShow} Fixed Price",
      showEstimate: "{isShow} Estimate",
      ShowDescription: "{isShow} Description",
    },
    assignedUser: "This user is already assigned to a todo item",
    comment: {
      title: "Write your comment",
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
