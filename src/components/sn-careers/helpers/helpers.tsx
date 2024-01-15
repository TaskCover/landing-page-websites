import { SearchStatus } from "store/career/action";
import {FormType} from "constant/enums";

export const TEXT_PAY_STATUS_CAREER: { [key in SearchStatus]: string } = {
    [SearchStatus.IS_OPENING]: "is_opening",
    [SearchStatus.IS_CLOSED]: "is_closed",
};

export const CareersData = [
    {
        title: "",
        location: "",
        timestamp: "",
        description: [
            "Attend and solve customer requests in connection with procedures, services at Service Counters.",
            "Update customer’s information to the system, create reservation form, booking form, confirm transactions.",
            "Guide customers on payment (POS, online bank transfer, cash) and completion of unit purchase procedures.",
            "Collaborate with Transaction Documents Management to return documents related to SPAs, unit transfer, bank loan documents to customers on time.",
            "Deliver documents to Customers and follow the delivery documents, notifications, official documents to customers.",
            "Conduct customer care/ appreciation activities under the requirements of line manager.",
            "Other tasks assigned by line managers.",
        ],
        requirements: [
            "Education/Technical qualification: Bachelor or college diploma",
            "Preference: Finance, Bank, Business Administration, Laws or equivalent professional qualification",
            "Knowledgeable of real estate",
            "At least 1 year experience working in Real Estate.",
            "Problem solving and Task management and follow-up.",
            "Able to work under pressure.",
        ],
        benefits: [
            "Competitive compensation package, including 13th-month salary and performance bonuses",
            "Comprehensive health care coverage for you and your dependents",
            "Generous leave policies, including annual leave, sick leave, and flexible work hours",
            "Convenient central district 1 office location, next to a future metro station",
            "Onsite lunch with multiple options, including vegetarian"
        ],

    }
]
export const DetailCareerData = [
    {
        title: "Description",
        desc: [
            "Attend and solve customer requests in connection with procedures, services at Service Counters.",
            "Update customer’s information to the system, create reservation form, booking form, confirm transactions.",
            "Guide customers on payment (POS, online bank transfer, cash) and completion of unit purchase procedures.",
            "Collaborate with Transaction Documents Management to return documents related to SPAs, unit transfer, bank loan documents to customers on time.",
            "Deliver documents to Customers and follow the delivery documents, notifications, official documents to customers.",
            "Conduct customer care/ appreciation activities under the requirements of line manager.",
            "Other tasks assigned by line managers.",
        ],
    },
    {
        title: "Requirements",
        desc: [
            "Education/Technical qualification: Bachelor or college diploma",
            "Preference: Finance, Bank, Business Administration, Laws or equivalent professional qualification",
            "Knowledgeable of real estate",
            "At least 1 year experience working in Real Estate.",
            "Problem solving and Task management and follow-up.",
            "Able to work under pressure.",
        ],
    },
    {
        title: "Benefits",
        desc: [
            "Competitive compensation package, including 13th-month salary and performance bonuses",
            "Comprehensive health care coverage for you and your dependents",
            "Generous leave policies, including annual leave, sick leave, and flexible work hours",
            "Convenient central district 1 office location, next to a future metro station",
            "Onsite lunch with multiple options, including vegetarian"
        ],
    }
]

export const ListFormSubmit = [
    {
        label:"First name",
        placeholder:"First name",
        type:FormType.Input,
        key:"first_name",
        required:true,
    },
    {
        label:"Last name",
        placeholder:"Last name",
        type:FormType.Input,
        key:"last_name",
        required:true,
    },
]