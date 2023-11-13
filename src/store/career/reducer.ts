import { DataStatus } from "constant/enums";
import { CareerData, GetCareerListQueries, getAllCareer, postCareer } from "./action";
import { Paging_Career } from "constant/types";
import { DEFAULT_PAGING_CAREER } from "constant/index";
import { createSlice } from "@reduxjs/toolkit";


export interface FeedbackState {
    careers: CareerData[];
    careersError: string | undefined | null;
    careersStatus: DataStatus;
    careersPaging: Paging_Career;
    career?: CareerData;
    careersFilters: Omit<GetCareerListQueries, "page" | "size">;
}

const initialState: FeedbackState = {
    careers: [],
    careersError: null,
    careersStatus: DataStatus.IDLE,
    careersPaging: DEFAULT_PAGING_CAREER,
    careersFilters: {},
};

const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCareer.pending, (state, action) => {
                // console.log("Đã vào đây");
                // console.log(action.meta.arg.page);
                // console.log(action.meta.arg.size);
                state.careersStatus = DataStatus.LOADING;
                state.careersPaging.page = Number(
                    action.meta.arg.page ?? DEFAULT_PAGING_CAREER.page,
                );
                state.careersPaging.size = Number(
                    action.meta.arg.size ?? DEFAULT_PAGING_CAREER.size,
                );
            })
            .addCase(getAllCareer.fulfilled, (state, { payload }) => {
                // console.log(payload);
                // console.log(state.feedbacks);
                const { ...paging } = { page: payload.data.page, size: payload.data.size, total_page: payload.data.total_page, totalItems: payload.data.size };
                state.careersStatus = DataStatus.SUCCEEDED;
                const sortedData = payload.data?.data?.sort((a, b) => {
                    // Sử dụng toán tử so sánh để so sánh theo thời gian tạo mới nhất
                    const timestampA = new Date(a.created_time).getTime();;
                    const timestampB = new Date(b.created_time).getTime();
                    return timestampB - timestampA;
                });
                state.careers = sortedData;
                state.careersPaging = Object.assign(state.careersPaging, paging);
            })
            .addCase(getAllCareer.rejected, (state, action) => {
                state.careersStatus = DataStatus.FAILED;
                state.careersError = action.error?.message;
            })
            .addCase(postCareer.fulfilled, (state, action: { payload }) => {
                
            })
    },
});


export const CareerReducer = careerSlice.reducer;
export default careerSlice.actions;