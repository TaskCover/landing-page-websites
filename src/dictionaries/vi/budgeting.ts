import { BudgetingDictionary } from "dictionaries/types/BudgetingDictionary";

export const BudgetingLang: BudgetingDictionary = {
    head: {
        title: 'Budgeting',
        titleDetail: 'Detail Budget',
    },
    toolbar: {
        date: 'Date',
        addTime: 'Time',
        addExpense: 'Expense',
        addInvoice: 'Invoice',
        serviceEdit: 'Edit',
		search: 'Search'
    },
    status: {
        open: 'Open',
        close: 'Close',
    },
    actionStatus: {
        create: 'Budget was created'
    },
    tabTime: {
        service: 'Service',
        person: 'Person',
        notes: 'Notes',
        time: 'Time',
        billable: 'Billable'
    },
    tabExpenses: {
        service: 'Service',
        description: 'Description',
        date: 'Date',
        att: 'Att.',
        paymentStatus: 'Payment Status',
        totalCost: 'Total Cost',
        billable: 'Billable',
    },
    tabInvoice: {
        subject: 'Subject',
        invoiceNumber: 'Invoice number',
        date: 'Date',
        att: 'Attr.',
        amountNoTax: 'Amount (no tax)',
        amountUnpaid: 'Amount unpaid',
        dueDate: 'Due Date',
    },
	tabService: {
		index: {
			name: "Name",
			workingTime: "Working time",
			price: "Price",
			cost: "Cost",
		},
		section: {
			serviceName: "Service Name",
			serviceType: "Service Type",
			billingType: "Billing Type",
			unit: "Unit",
			tracking: "Tracking",
			estimate: "Estimate",
		}
	},
    dialog: {
        titleModalAdd: "Add time entry",
        date: 'Date',
        project: 'Project',
        timeRanger: 'Time Ranger',
        startTime: 'Start Time',
        endTime: 'End Time',
        note: 'Note',
        cancelBtnText: 'Cancel',
        addBtnText: 'Add',
        editBtnText: 'Edit',
    },
	dialogRecurring: {
		titleModalAdd: 'Make this Recurring Budget',
		cancelBtnText: 'Cancel',
        addBtnText: 'Make recurring',
        editBtnText: 'Edit recurring',
		recurringInterval: "Recurring Interval",
		nextOccurrence: "Next Occurrence",
		stopRecurring: "Stop Recurring",
	},
	delete: {
		titleConfirmDelete: "Xác Nhận Xóa",
		contentConfirmDelete: "Bạn có chắc chắn muốn xóa?",
	}
}
