import { BillingDictionary } from "dictionaries/types/BillingDictionary";

export const BillingLang: BillingDictionary = {
  list: {
    head: {
      title: "",
    },
    filter: {
      recent: "",
      saved: "",
      status: "status",
      add: "Add Filter",
    },
    form: {
      title: {
        for_invoice: "For invoicing",
        uninvoiced_time_expenses: "Uninvoiced Time & Expenses",
        uninvoiced_amount: "Uninvoiced amount",
        display_service: "Display expenses as",
        subsidiary: "Subsidiary",
        subTotal: "Subtotal",
        vat: "VAT",
        total: "Total",
        invoice_preview: "Invoice preview",
        display_expenses: "Display expenses as",
        of_the_budget_revenue: "of the budget revenue",
      },
      step: {
        title: {
          budgets: "Select budgets",
          preview: "Preview line items",
        },
      },
      content: {
        step1: {
          content1: "What do you want to invoice?",
          content2: "Select budgets that will be linked to this invoice.",
          companyName: "Company AI chat generate",
        },
        step2: {
          content1: "What hours and expenses should go on the Invoice?",
          content2: "Invoicing method",
        },
      },
      table_step_1: {
        for_invoicing: "For invoicing",
        name: "Name",
        project: "Project",
        revenue: "Revenue",
        status: "Status",
      },
      table_step_2: {
        amount: "Amount",
        description: "Discription",
        qty: "Qty",
        rate: "Rate",
        service_type: "Service type",
        unit: "Unit",
      },
      filter: {
        add: "Add Filter",
      },
      button: {
        nextStep: "Next step",
        submit: "Submit",
      },
    },
    table: {
      subject: "Subject",
      invoiceNumber: "Invoice number",
      date: "Date",
      company: "Company",
      budgets: "Budgets",
      att: "Att.",
      amount: "Amount (no tax)",
      amountUnpaid: "Amount unpaid",
      dueDate: "Due date",
    },
    exportView: {
      fullNameCompany: "",
      subject: "Subject",
      client: "Client",
      date: "date",
      dueDate: "Due date",
      createBy: "Created By",
      payment: {
        description: "Description",
        unit: "Unit",
        quality: "Qyt",
        rate: "Rate",
        amount: "Amount",
      },
      subTotal: "Subtotal",
      vat: "VAT",
      grandTotal: "Grand Total",
    },
    button: {
      invoice: "Invoice",
      exportView: "Export view",
    },
    modalExport: {
      documentFormat: "Document forrmat",
      orientation: "Orientation",
      pageSize: "Page size",
      title: "Export View",
      button: {
        cancel: "Cancel",
        export: "Export",
      },
    },
  },
  detail: {},
};
