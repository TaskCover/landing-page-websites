export type BudgetingDictionary = {
    head: {
        title: string;
        titleDetail: string;
    },
    toolbar: {
        date: string;
        addTime: string;
        addExpense: string;
        addInvoice: string;
    },
    status: {
        open: string;
        close: string;
    },
    actionStatus: {
        create: string;
    },
    tabTime: {
        service: string;
        person: string;
        notes: string;
        time: string;
        billable: string;
    },
    tabExpenses: {
        service: string;
        description: string;
        date: string;
        att: string;
        paymentStatus: string;
        totalCost: string;
        billable: string;
    },
    tabInvoice: {
        subject: string;
        invoiceNumber: string;
        date: string;
        att: string;
        amountNoTax: string;
        amountUnpaid: string;
        dueDate: string
    },
    dialog: {
        titleModalAdd: string;
        date: string;
        project: string;
        timeRanger: string;
        startTime: string;
        endTime: string;
        note: string;
        cancelBtnText: string;
        addBtnText: string;
        editBtnText: string;
    },
	dialogRecurring: {
		titleModalAdd: string;
		cancelBtnText: string;
        addBtnText: string;
        editBtnText: string;
		recurringInterval: string;
		nextOccurrence: string;
		stopRecurring: string;
	}
}
