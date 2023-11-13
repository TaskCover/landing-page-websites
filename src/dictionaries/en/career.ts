import { CareerDictionary } from "dictionaries/types/CareerDictionary";

export const CareerLang: CareerDictionary = {
    career: {
        head: {
            title: "Career"
        }
    },

    actions: {
        search: "search"
    },

    careerTable: {
        id: "ID",
        title: "Title",
        slug: "Slug",
        description: "Description",
        location: "Location",
        start_time: "Start time",
        end_time: "End time",
        numberOfHires: "Number of hires",
        statusList: {
            is_opening: "Opening",
            is_closed: "Closing",
        },
    },
    
    status: "Status",
    is_opening: "Opening",
    is_closed: "Closing",

    form_career: {
        title: "Title",
        slug: "Slug",
        description: "Description",
        location: "Location",
        start_time: "Start time",
        end_time: "End time",
        numberOfHires: "Number of hires",
        is_opening: "Status"
    },

    career_success: {
        notification: {
            success_responsed: "Successful career",
        },
    },

    career_title_view: {
        head: {
            title: "Review career category ",
        },
        key: "Review career category ",
        title: "List of reviews",
    },
}