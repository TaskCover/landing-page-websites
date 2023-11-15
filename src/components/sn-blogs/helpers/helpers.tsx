import { BlogStatus } from "store/blog/actions";

export const BLOG_STATUS: { [key in BlogStatus]: string } = {
    [BlogStatus.PUBLISHED]: "xuất bản",
    [BlogStatus.DRAFT]: "bản nháp"
}
