import { CareerDictionary } from "dictionaries/types/CareerDictionary";


export const CareerLang: CareerDictionary = {
    career: {
        head: {
            title: "Nghề nghiệp"
        },
    },

    title_form: "Nghề nghiệp",

    actions: {
        search: "Tìm kiếm"
    },

    careerTable: {
        id: "Mã",
        title: "Tiêu đề",
        slug: "Đường dẫn",
        description: "Miêu tả",
        location: "Vị trí",
        time: "Thời gian tuyển dụng",
        numberOfHires: "Số lượng tuyển dụng",
        statusList: {
            is_opening: "Đang mở",
            is_closed: "Đang đóng",
        },
        responsed : "Note",
        endtime : "đến",
    },

    status: "Trạng thái",
    is_opening: "Đang mở",
    is_closed: "Đang đóng",

    form_career: {
        title: "Tiêu đề",
        slug: "Đường dẫn",
        description: "Miêu tả",
        location: "Vị trí",
        start_time: "Thời gian bắt đầu",
        end_time: "Thời gian kết thức",
        numberOfHires: "Số lượng tuyển dụng",
        is_opening: "Tình trạng",
        opening: "Mở",
        closed: "Đóng",
    },
   
    career_success: {
        notification: {
            success_responsed: `{label} thành công`,
            error_responsed_date: "Kiểm tra lại ngày"
        },
    },

    career_title_view:{
        head:{
            title: "Danh mục nghề nghiệp",
        },
        key: "Danh mục nghề nghiệp",
        title : "Danh Sách Danh mục nghề nghiệp",
    },

    confirmRemove: {
        title: "Xác nhận loại bỏ danh mục",
        content: "Bạn chắc chắn muốn loại bỏ danh mục này ?"
    },
}