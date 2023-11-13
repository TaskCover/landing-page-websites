import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    BlogData,
    GetBlogListQueries,
    createNewBlogs,
    getAllBlogs,
    getBlogBySlug,
    getBlogComments,
    getRelatedBlog,
    updateBlog,
} from "./actions";
import { DataStatus } from "constant/enums";
import { BlogForm } from "components/sn-blogs/components/Form";

export const useBlogs = () => {
    const dispatch = useAppDispatch();
    const { blogs: items, blogsStatus: status, blogsError: error, blogsFilters: filters, blog: item,relatedBlogs,listBlogComment } = useAppSelector(
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
            // alert(id);
            // alert(JSON.stringify(queries));
            await dispatch(getAllBlogs({ ...queries }));
        },
        [dispatch],
    );

    const onCreateNewBlog = useCallback(
        async (data: BlogForm) => {
            return await dispatch(createNewBlogs(data)).unwrap();
        },
        [dispatch],
    );
    const onUpdateBlog = useCallback(
        async (id: string, blog: BlogForm) => {
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

    const onGetBlogComments =  useCallback(
        async(slug :  string)=>{
            try{
                return await dispatch(getBlogComments(slug)).unwrap();
            }catch(error){
                throw error;
            }
        },[dispatch],
    )
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
    };
};
