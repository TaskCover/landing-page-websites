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
    },
    title: {
      upload: "Tải lên",
      uploadImage: "Tải ảnh lên",
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
};
