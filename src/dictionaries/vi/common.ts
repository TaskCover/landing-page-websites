import { CommonDictionary } from "dictionaries/types/CommonDictionary";

export const CommonLang: CommonDictionary = {
  app: {
    title: "Taskcover",
    description: "Mô tả cho Taskcover",
  },
  form: {
    error: {
      required: "{name} là bắt buộc.",
      invalid: "{name} không hợp lệ.",
      min: "{name} phải có ít nhất {min} ký tự.",
      minAndMax: "{name} phải từ {min} đến {max} ký tự.",
      confirmNotMatch: "{name} không khớp.",
      notSame: "{name} không thể trùng với {name2}.",
      existed: "{name} đã tồn tại trong hệ thống.",
      notExist: "{name} không tồn tại trong hệ thống.",
      incorrect: "{name} không chính xác.",
      overMax: "{name} quá dài, tối đa {max} ký tự.",
      datePast: "{name} không thể là một ngày trong quá khứ.",
      gte: "{name} phải lớn hơn hoặc bằng {name2}",
    },
    title: {
      upload: "Tải lên",
      uploadImage: "Tải ảnh lên",
      assigner: "Người phụ trách",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      dueDate: "Ngày đến hạn",
      description: "Mô tả",
      note: "Ghi chú",
      title: "Tiêu đề",
    },
    confirm: "Xác nhận",
    save: "Lưu",
    cancel: "Hủy bỏ",
    add: "Thêm",
    admin: "Quản lý"
  },
  notification: {
    imageTypeInvalid:
      "Tệp tin không hợp lệ. Hiện tại hệ thống chỉ hỗ trợ PNG, JPEG, JPG",
    success: "{label} thành công!",
  },
  error: {
    anErrorTryAgain: "Có lỗi xảy ra. Vui lòng thử lại.",
    anErrorTryReload: "Đã xảy ra lỗi. Vui lòng thử tải lại trang.",
  },
  position: "Chức vụ",
  fullName: "Họ tên",
  phone: "Số điện thoại",
  status: "Trạng thái",
  filter: {
    refresh: "Làm mới dữ liệu",
    clear: "Xóa bộ lọc",
    status: {
      active: "Hoạt động",
      close: "Kết thúc",
      pause: "Tạm dừng",
    },
  },
  createNew: "Thêm mới",
  update: "Cập nhật",
  edit: "Sửa",
  delete: "Xóa",
  close: "Đóng",
  search: "Tìm kiếm",
  assigner: "Người phụ trách",
  name: "Tên",
  paging: {
    show: "Hiển thị",
    outOf: "mỗi trang trên tổng số {count}",
  },
  statusEnum: {
    active: "Hoạt động",
    close: "Kết thúc",
    pause: "Tạm dừng",
  },
  searchBy: "Tìm kiếm theo {name}",
  creationDate: "Ngày tạo",
  creator: "Người tạo",
  confirmDelete: {
    title: "Xác nhận xóa",
    content: "Bạn có chắc chắn muốn xóa?",
  },
  upgradeAccount: "Nâng cấp tài khoản",
  clickGoDetail: "Nhấn để tới trang chi tiết {name}",
  waiting: "Đang chờ",
  approved: "Đã chấp nhận",
  rejected: "Đã từ chối",
  paid: "Đã thanh toán",
  unpaid: "Chưa thanh toán",
  noData: "Không có dữ liệu.",
  unauthorized: "Tài khoản của bạn không có quyền truy cập trang này!",
  duplicate: "Tạo bản sao",
  move: "Di chuyển",
  rename: "Đổi tên",
  all: "Tất cả",
  clickToViewLarge: "Bấm vào để xem lớn hơn",
  processing: "Đang xử lý",
  aFewFilesInvalid:
    "Hệ thống chỉ hỗ trợ các định dạng file doc, docx, xlsx, xls, csv, mp3, mp4, png, jpeg, jpg, pdf, ppt, pptx, zip, rar. Vui lòng kiểm tra lại định dạng file đính kèm của bạn.",
  processingUpload: "Đang tải lên tệp tin...",
};
