import { BillingDictionary } from "dictionaries/types/BillingDictionary";

export const BillingLang: BillingDictionary = {
  list: {
    head: {
      title: "",
    },
    filter: {
      recent: "",
      saved: "",
      status: "Trạng thái",
      add: "Thêm bộ lọc",
    },
    form: {
      title: {
        for_invoice: "Lập hóa đơn",
        uninvoiced_time_expenses: "Không lập hóa đơn thời gian và chi phí",
        uninvoiced_amount: "Không lập hóa đơn số lượng",
        display_service: "Dịch vụ hiển thị ",
        subsidiary: "Công ty con",
        subTotal: "Tổng phụ",
        vat: "VAT",
        total: "Tổng cộng",
        invoice_preview: "Xem trước hóa đơn",
        display_expenses: "Chi phí trưng bày",
        of_the_budget_revenue: " Trong thu ngân sách",
      },
      step: {
        title: {
          budgets: "Thiết lập ngân sách",
          preview: "Xem chi tiết đơn hàng",
        },
      },
      content: {
        step1: {
          content1: "Bạn muốn xuất hóa đơn gì?",
          content2: "Chọn ngân sách sẽ được liên kết với hóa đơn này.",
          companyName: "Company AI chat generate",
        },
        step2: {
          content1: "Giờ và chi phí nào nên được ghi trên Hóa đơn?",
          content2: "Phương thức lập hóa đơn",
        },
      },
      table_step_1: {
        for_invoicing: "Lập hóa đơn",
        name: "Tên",
        project: "Dự án",
        revenue: "Doanh thu",
        status: "Trạng thái",
      },
      table_step_2: {
        amount: "Số lượng",
        description: "Mô tả",
        qty: "Qty",
        rate: "Tỷ lệ",
        service_type: "Loại dịch vụ",
        unit: "Đơn vị",
      },
      filter: {
        add: "Thêm bộ lọc",
      },
      button: {
        nextStep: "Bước tiếp theo",
        submit: "Xác nhận",
      },
    },
    table: {
      subject: "Hóa đơn",
      invoiceNumber: "Mã hóa đơn",
      date: "Ngày tạo",
      company: "Tên công ty",
      budgets: "Ngân sách",
      att: "att",
      amount: "Đã thanh toán",
      amountUnpaid: "Chưa thanh toán",
      dueDate: "Ngày hết hạn",
    },
    exportView: {
      fullNameCompany: "",
      subject: "Hóa đơn",
      client: "Khách hàng",
      date: "Ngày tạo",
      dueDate: "Ngày hết hạn",
      createBy: "Người tạo",
      payment: {
        description: "Mô tả",
        unit: "Đơn vị",
        quality: "",
        rate: "Tỷ lệ",
        amount: "Số tiền",
      },
      subTotal: "Tổng phụ",
      vat: "Thuế",
      grandTotal: "Tổng cộng",
    },
    button: {
      invoice: "Hóa đơn",
      exportView: "Xuất chế độ xem",
    },
    modalExport: {
      documentFormat: "Định dạng tài liệu",
      orientation: "Hướng",
      pageSize: "Kích thước trang",
      title: "Xuất chế độ xem",
      button: {
        cancel: "Hủy",
        export: "Xuất file",
      },
    },
  },
  detail: {
    tab: {
      title: {},
    },
  },
};
