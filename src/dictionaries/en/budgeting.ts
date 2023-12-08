import { BudgetingDictionary } from "dictionaries/types/BudgetingDictionary";

export const BudgetingLang: BudgetingDictionary = {
    head: {
        title: 'Budgeting',
        titleDetail: 'Detail Budget',
    },
    toolbar: {
        date: 'Ngày',
        addTime: 'Giờ',
        addExpense: 'Expense',
        addInvoice: 'Invoice',
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
    dialog: {
        titleModalAdd: "Add time entry",
        date: 'Ngày',
        project: 'Dự án',
        timeRanger: 'Khoảng thời gian',
        startTime: 'Giờ bắt đầu',
        endTime: 'Giờ kết thúc',
        note: 'Ghi chú',
        cancelBtnText: 'Hủy',
        addBtnText: 'Thêm',
        editBtnText: 'Sửa',
    }
}
