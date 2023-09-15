import * as yup from "yup";

export const schemaProject = yup
  .object({
    project_id: yup.string().trim().required("Tên dự án không được bỏ trống"),
    position: yup.string().trim().required("Vị trí không được bỏ trống"),
    dateRange: yup
      .object()
      .shape({
        startDate: yup.date().required("Ngày bắt đầu không được bỏ trống"),
        endDate: yup
          .date()
          .required("Ngày kết thúc không được bỏ trống")
          .min(
            yup.ref("startDate"),
            "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu",
          ),
      })
      .required("Khoảng thời gian không được bỏ trống"),
    workingTime: yup
      .string()
      .required("Thời gian làm việc không được bỏ trống"),
    allocation: yup.string().notRequired(),
    allocation_type: yup.string().notRequired(),
    note: yup.string().trim().notRequired(),
  })
  .required();

export const schemaTimeOff = yup
  .object({
    categoryTimeOff: yup
      .string()
      .trim()
      .required("Lý do nghỉ không được bỏ trống"),
    dateRange: yup
      .object()
      .shape({
        startDate: yup.date().required("Ngày bắt đầu không được bỏ trống"),
        endDate: yup
          .date()
          .required("Ngày kết thúc không được bỏ trống")
          .min(
            yup.ref("startDate"),
            "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu",
          ),
      })
      .required("Khoảng thời gian không được bỏ trống"),
    workingTime: yup
      .string()
      .required("Thời gian làm việc không được bỏ trống"),
    allocation: yup.string().notRequired(),
    allocation_type: yup.string().notRequired(),
    note: yup.string().trim().notRequired(),
  })
  .required();
