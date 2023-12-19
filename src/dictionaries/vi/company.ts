import { CompanyDictionary } from "dictionaries/types/CompanyDictionary";

export const CompanyLang: CompanyDictionary = {
  employees: {
    head: {
      title: "Danh sách nhân viên | Taskcover",
    },
    title: "Danh sách nhân viên",
    expirationDate: "Ngày hết hạn",
    paid: "Đã thanh toán",
    pay: "Thanh toán",
    unPaid: "Chưa thanh toán",
    waiting: "Chờ thanh toán",
    key: "nhân viên",
    isNeedSelect: "Không có bất kỳ nhân viên nào được chọn",
    confirmPayment: {
      title: "Xác nhận thanh toán",
      content:
        "Bạn có chắc chắn muốn thanh toán {count, plural, =1 {tài khoản} other {tất cả những tài khoản}} này",
    },
    confirmRemove: {
      title: "Xác nhận loại bỏ nhân viên",
      content:
        "Bạn chắc chắn muốn loại bỏ {count, plural, =1 {nhân viên này} other {những nhân viên dưới}}?",
    },
    notification: {
      success: "{label} nhân viên thành công!",
    },
  },
  costHistory: {
    head: {
      title: "Lịch sử chi phí | Taskcover",
    },
    title: "Lịch sử chi phí",
  },
  positions: {
    head: {
      title: "Danh sách chức vụ | Taskcover",
    },
    form: {
      title: {
        name: "Tên chức vụ",
      },
    },
    title: "Danh sách chức vụ",
    numberOfEmployees: "Số nhân viên giữ chức vụ",
    key: "chức vụ",
    confirmDelete: {
      title: "Xác nhận xóa chức vụ",
      content: "Bạn có chắc chắn xóa chức vụ này?",
    },
    notification: {
      success: "{label} chức vụ thành công!",
    },
  },
  projectTypes: {
    head: {
      title: "Danh sách loại dự án | Taskcover",
    },
    form: {
      title: {
        name: "Tên loại dự án",
      },
    },
    title: "Danh sách loại dự án",
    key: "loại dự án",
    confirmDelete: {
      title: "Xác nhận xóa loại dự án",
      content: "Bạn có chắc chắn xóa loại dự án này",
    },
    notification: {
      success: "{label} loại dự án thành công!",
    },
  },
  information: {
    head: {
      title: "Thông tin công ty | Taskcover",
    },
    form: {
      title: {
        name: "Tên công ty",
        taxCode: "Mã số thuế",
        address: "Địa chỉ",
      },
    },
    title: "Thông tin công ty",
    generalInformation: "Thông tin chung",
    detailInformation: "Thông tin chi tiết",
    ownerOfCompany: "Chủ sở hữu",
    ownerEmail: "Email chủ sở hữu",
    numberOfEmployees: "Số nhân viên",
    numberOfPositions: "Số chức vụ",
    numberOfProjects: "Số dự án",
    key: "thông tin công ty",
    notification: {
      success: "Cập nhật thông tin công ty thành công!",
    },
  },
};
