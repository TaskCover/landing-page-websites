import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    BlogData,
    BlogFormData,
    CommentBlogData,
    GetBlogListQueries,
    createBlogComment,
    createNewBlogs,
    getAllBlogs,
    getBlogBySlug,
    getBlogComments,
    getRelatedBlog,
    updateBlog,
    uploadFile,
} from "./actions";
import { DataStatus } from "constant/enums";
import { clientStorage } from "utils/storage";
import { ACCESS_TOKEN_STORAGE_KEY, IMAGES_ACCEPT } from "constant/index";
import { Attachment } from "constant/types";
import { object } from "yup";

export const useBlogs = () => {
    const dispatch = useAppDispatch();
    const { blogs: items, blogsStatus: status, blogsError: error, blogsFilters: filters, blog: item, relatedBlogs, listBlogComment } = useAppSelector(
        (state) => state.blogs,
        shallowEqual,
    );
    const { page, size, totalItems, total_page } = useAppSelector(
        (state) => state.blogs.blogsPaging,
        shallowEqual,
    );
    const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
    const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

    const onGetBlogs = useCallback(
        async (queries: GetBlogListQueries) => {
            await dispatch(getAllBlogs({ ...queries }));
        },
        [dispatch],
    );

    const onUpdateBlog = useCallback(
        async (id: string, blog: BlogData) => {
            try {
                return await dispatch(updateBlog({ id, blog })).unwrap();
            } catch (error) {
                throw error;
            }
        },
        [dispatch],
    );
    const onGetBlogBySlug = useCallback(
        async (slug: string) => {
            try {
                return await dispatch(getBlogBySlug(slug)).unwrap();
            } catch (error) {
                throw error;
            }
        }, [dispatch,]
    );

    const onGetRelatedBlogs = useCallback(
        async (slug: string) => {
            try {
                return await dispatch(getRelatedBlog(slug)).unwrap();
            } catch (error) {
                throw error;
            }
        }, [dispatch],
    )

    const onGetBlogComments = useCallback(
        async (slug: string) => {
            try {
                return await dispatch(getBlogComments(slug)).unwrap();
            } catch (error) {
                throw error;
            }
        }, [dispatch],
    )
    const onCreateCommentBlog = useCallback(
        async (id: string, cmt: CommentBlogData, Token: string | null) => {
            try {
                return await dispatch(createBlogComment({ id, cmt, Token })).unwrap();
            } catch (error) {
                console.error("Error submitting form:", error);
                throw error;
            }
        }, [dispatch]
    )

    const onCreateNewBlog = useCallback(
        async (data: BlogFormData) => {
            try {
                if (data.backgroundUpload) {
                    const backgroundUploadResponse = await dispatch(
                        uploadFile({
                            file: data.backgroundUpload,
                        }),
                    );
                    data.background = backgroundUploadResponse.payload.object;
                }
                // Upload attachmentsUpload
                if (data.attachmentsUpload && data.attachmentsUpload.length > 0) {
                    const attachmentUploadPromises = data.attachmentsUpload.map((file) =>
                        dispatch(uploadFile({ file }))
                    );
                    const attachmentUploadResponses = await Promise.all(attachmentUploadPromises);
                    data.attachments = attachmentUploadResponses.map((response) => response.payload.object);
                }
                const Token = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
                return await dispatch(createNewBlogs({data,Token: Token ?? null })).unwrap();
            } catch (error) {
                console.error("Error:", error);
            }
        },
        [dispatch],


    );


    return {
        onGetBlogs,
        onUpdateBlog,
        items,
        status,
        error,
        isIdle,
        isFetching,
        page,
        size,
        totalItems,
        total_page,
        onCreateNewBlog,
        filters,
        onGetBlogBySlug,
        item,
        onGetRelatedBlogs,
        relatedBlogs,
        listBlogComment,
        onGetBlogComments,
        onCreateCommentBlog,
    };
};
