import { string } from "yup"

export type CareerDictionary={
    career :{
        head:{
            title:string
        }
    },

    actions: {
        search: string
    },
    
    careerTable: {
        id: string,
        title: string,
        slug: string,
        description: string,
        location: string,
        start_time:string,
        end_time:string,
        numberOfHires:string,
        statusList: {
            is_opening: string,
            is_closed: string,
        },
    },

    status: string,
    is_opening: string,
    is_closed: string,

    form_career : {
        title: string,
        slug: string,
        description: string,
        location: string,
        start_time:string,
        end_time:string,
        numberOfHires:string,
        is_opening: string,
    }

    career_success:{
        notification:{
            success_responsed: string,
        },
    },

    career_title_view:{
        head:{
            title: string,
        },
        key: string,
        title : string,
    },
}