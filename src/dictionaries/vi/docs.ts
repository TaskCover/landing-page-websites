import { DocsDictionary } from "dictionaries/types/DocsDictionary";

export const DocsLang: DocsDictionary = {
    title : 'Tài liệu',
    button: {
        add: 'Thêm'
     },
     filter: {
        all : 'Tất cả',
        fields  : 'Lĩnh vực',
        search: 'Tìm kiếm tài liệu',
        group : {
            group : 'Nhóm',
           none : 'Không',
           creator : 'Người sáng tạo',
           project : 'Dự án',
        },
        filter: {
        filter : 'Lọc',
           creator : 'Người sáng tạo',
           lastEdited : 'Chỉnh sửa lần cuối',
           name : 'Tên',
           project : 'Dự án',
           projectStatus : 'Trạng thái dự án',
        }
     }
};
