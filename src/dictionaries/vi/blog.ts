import { BlogDictionary } from "dictionaries/types/BlogDictionary";

export const BlogLang: BlogDictionary = {
    blogs: {
        head: {
            title: "Bài viết"
        }
    },
    blogCategory: {
        head: {
            title: "Danh mục bài viết"
        },
        key: "danh mục bài viết",
        confirmRemove: {
            title: "Xác nhận loại bỏ danh mục",
            content: "Bạn chắc chắn muốn loại bỏ danh mục này ?"
        },
        notification: {
            success: "{label} danh mục thành công"
        },
        title: "Danh sách danh mục bài viết"
    },
    blogCategoryList: {
        id: "Mã",
        name: "Tên danh mục bài viết",
        slug: "Đường dẫn",
        detail: "Chi tiết",
    },
    blogCategoryForm: {
        name: "Tên danh mục",
        slug: "Đường dẫn",
        detail: "Mô tả chi tiết"
    }
    ,
    title: "Bài viết",
    blogList: {
        head: {
            title: "Danh sách bài viết",
        },
        title: "Tiêu đề",
        content: "Nội dung",
        category: "Danh mục",
        tag: "Nhãn dán",
        statusBlog:"Trạng thái",
        slug:"Đường dẫn",
        created_time : "Ngày tạo",
        relatedBlogs:"Bài viết liên quan"
    },
    published: "Xuất bản",
    draft: "Bản nháp",
    actions: {
        createBlog: "Thêm mới",
        search: "Tìm kiếm",
        status: "Trạng thái",
        delete:{
            title:"Xác nhận xóa bài viết",
            confirm:"Bạn muốn xóa bài viết ?",
            remove:"Xóa",
        },
        draft : "Nháp",
        published:"Xuất bản",
        update:{
            title:"Bạn có muốn cập nhật trạng thái ?",
            content:"Cập nhật trạng thái"
        },
        updateBlog : "Cập nhật"
    },
    blogForm: {
        key: "bài viết",
        title: "Tiêu đề",
        content: "Nội dung",
        slug: "Đường dẫn",
        background: "Ảnh bìa",
        category: "Danh mục bài viết",
        tag: "Nhãn dán",
        published: "Xuất bản",
        attachments: "Tệp đính kèm",
    },
    status: {
        true: "Xuất bản",
        false: "Nháp"
    },
    comment:{
        writeComment :"Viết bình luận",
        sendComment : "Gửi bình luận"
    }
}
