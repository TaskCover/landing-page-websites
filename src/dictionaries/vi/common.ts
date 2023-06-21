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
      description: "Mô tả",
    },
    confirm: "Xác nhận",
    cancel: "Hủy bỏ",
  },
  notification: {
    imageTypeInvalid:
      "Tệp tin không hợp lệ. Hiện tại hệ thống chỉ hỗ trợ PNG, JPEG, JPG",
  },
  error: {
    anErrorTryAgain: "Có lỗi xảy ra. Vui lòng thử lại.",
    anErrorTryReload: "Đã xảy ra lỗi. Vui lòng thử tải lại trang.",
    noData: "Không có dữ liệu.",
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
};
