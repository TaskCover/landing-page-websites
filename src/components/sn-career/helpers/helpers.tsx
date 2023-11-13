import { SearchStatus } from "store/career/action";
import { FeedbackStatus } from "store/feedback/actions"

export const TEXT_PAY_STATUS_FEEDBACK: { [key in SearchStatus]: string } = {
    [SearchStatus.IS_OPENING]: "is_opening",
    [SearchStatus.IS_CLOSED]: "is_closed",
};