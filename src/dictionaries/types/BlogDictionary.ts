import { StringMap } from "quill";
import { string } from "yup"

export type BlogDictionary = {
    blogs: {
        head: {
            title: string
        }
    },
    blogCategory: {
        head: {
            title: string;
        },
        key: string,
        notification: {
            success: string,
        },
        confirmRemove: {
            title: string,
            content: string,
        },
        title: string,
    },
    blogCategoryList: {
        id: string,
        name: string,
        slug: string,
        detail: string,
    },
    blogCategoryForm: {
        name: string,
        slug: string,
        detail: string
    }
    title: string,
    blogList: {
        head: {
            title: string
        },
        slug: string,
        title: string,
        content: string,
        category: string,
        tag: string,
        statusBlog: string,
        created_time : string,
    },
    published: string,
    draft: string,
    actions: {
        createBlog: string,
        search: string,
        status: string,
        delete: {
            title:string,
            confirm:string,
            remove:string,
        },
        published:string,
        draft:string,
    },
    blogForm: {
        key: string,
        title: string,
        content: string,
        slug: string,
        background: string,
        category: string,
        tag: string,
        published: string,
        attachments: string,
    },
    status: {
        true: string,
        false: string,
    },
    comment : {
        writeComment :string;
        sendComment :string;
    }
}
