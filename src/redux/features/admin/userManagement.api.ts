import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/students",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["AcademicSemester"],
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data,
            }),
        }),
        getSingleStudent: builder.query({
            query: (studentId) => ({
                url: `/students/${studentId}`,
                method: "GET",
            }),
        }),
        updateStudent: builder.mutation({
            query: ({ studentId, data }) => ({
                url: `/students/${studentId}`,
                method: "PATCH",
                body: data,
            }),
        }),
        blockStudent: builder.mutation({
            query: (studentId) => ({
                url: `/users/change-status/${studentId}`,
                method: "POST",
                body: {
                    status: "blocked",
                },
            }),
        }),
    }),
});

export const {
    useGetSingleStudentQuery,
    useGetAllStudentsQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useBlockStudentMutation,
} = userManagementApi;
