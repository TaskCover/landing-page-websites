import { SalesDictionary } from "dictionaries/types/SalesDictionary";

export const salesLang: SalesDictionary = {
  list: {
    title: "Giao dịch",
    head: {
      title: "Sales | Taskcover",
    },
    filter: {
      decending: "Giảm dần",
      ascending: "Tăng dần",
    },
    action: {
      deal: "Giao dịch",
      export: "Xuất ra file",
    },
    newDealForm: {
      title: "Thêm Giao dịch mới",
      dealName: "Tên giao dịch",
      dealMember: "Thành viên giao dịch",
      unit: "Đơn vị",
      owner: "Chủ sở hữu",
      tags: "Thẻ",
      submit: "Thêm Giao Dịch",
    },
    table: {
      stage: "Giai đoạn",
      pjRevenue: "Doanh thu PJ",
      revenue: "Doanh thu",
      time: "Thời gian",
      owner: "Chủ sở hữu",
      probability: "Xác suất",
      lastActivity: "Hoạt động gần đây",
    },
    stage: {
      lead: "Dẫn đầu",
      proposalSent: "Đã gửi đề xuất",
      prospect: "Triển vọng",
      waitingApprove: "Chờ phê duyệt",
      negotiation: "Thương Lượng",
    },
    exportView: {
      title: "Xuất chế độ xem",
      documentFormat: "Định dạng tài liệu",
      orientation: "Hướng",
      pagesize: "Kích thước trang",
    },
  },
  detail: {
    tab: {
      assign: "Thành Viên",
      feed: "Tin mới",
      service: "Dịch vụ",
    },
    todoList: {
      assign: "Phân công",
      dueDate: "Thời hạn",
      title: "Danh sách việc cần làm",
      addTodo: "Thêm việc cần làm",
      addNew: "Thêm mới",
    },
    service: {
      title: "Dịch vụ",
      table: {
        name: "Tên dịch vụ",
        price: "Giá",
        unit: "Đơn vị",
        quantity: "Số lượng",
        description: "Mô tả",
        billType: "Loại hóa đơn",
        discount: "Giảm giá",
        estimate: "Ước tính",
        markup: "Đánh dấu",
        serviceType: "Loại dịch vụ",
        totalBuget: "Tổng ngân sách",
      },
      addNewFromRateCard: "Thêm mới từ thẻ giá",
      addNewRow: "Thêm mới hàng",
      addSection: "Thêm mục",
      duplicate: "Nhân bản",
      showDiscount: "{isShow} giảm giá",
      showFixedPrice: "{isShow} giá cố định",
      showMarkup: "{isShow} đánh dấu",
      showEstimate: "{isShow} ước tính",
      ShowDescription: "{isShow} mô tả",
    },
    comment: {
      title: "Bình luận",
      placeholder: "Viết bình luận",
      show: {
        attachment: "Tệp đính kèm",
        change: "Thay đổi",
        title: "Hiển thị",
        comments: "Tất cả bình luận",
      },
      submit: "Gửi",
    },
  },
};
