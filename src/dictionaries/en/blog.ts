import { BlogDictionary } from "dictionaries/types/BlogDictionary";

export const BlogLang: BlogDictionary = {
    blogs: {
        head: {
            title: "Blogs"
        }
    },
    blogCategory: {
        head: {
            title: "Blog Category List"
        },
        key: "category blog",
        confirmRemove: {
            content: "Are you sure to remove this category ? ",
            title: "Confirm remove category",
        },
        notification: {
            success: "{label} category successfully"
        },
        title: "Category Blog Manager",
    },
    blogCategoryList: {
        id: "Id",
        name: "Category Name",
        slug: "Slug",
        detail: "Detail"
    },
    blogCategoryForm: {
        name: "CategoryName",
        slug: "Slug",
        detail: "Detail"
    }
    ,
    title: "Blogs",
    blogList: {
        head: {
            title: "Blog List",
        },
        title: "Title",
        content: "Content",
        category: "Category",
        tag: "Tag",
        statusBlog: "Status",
        slug: "Slug",
        created_time : "Create Time",
    },
    published: "Published",
    draft: "Draft",
    actions: {
        createBlog: " Create new",
        search: "Search",
        status: "Status",
        delete:{
            title : "Confirm delete blog ",
            confirm : "Are you sure to remove blog ?",
            remove : "Remove",
        },
        draft:"Draft",
        published : "Published",
    },
    blogForm: {
        key: "blog",
        title: "Title",
        content: "Content",
        slug: "Slug",
        background: "Background",
        category: "Category blog",
        tag: "Tag",
        published: "Published",
        attachments: "Attachments",
    },
    status: {
        true: "Published",
        false: "Draft",
    },
    comment:{
        writeComment: "Write comment ...",
        sendComment:"Send comment"
    }
}

