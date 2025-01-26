import {
    TFaculty,
    TQueryParam,
    TResponseRedux,
    TSemester,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/semester-registrations/",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["RegisteredSemester"],
        }),
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["RegisteredSemester"],
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["RegisteredSemester"],
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/courses/",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<any[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["courses"],
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["courses"],
        }),
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: "PUT",
                body: args.data,
            }),
        }),
        getAllCourseFaculties: builder.query({
            query: (courseId) => ({
                url: `/courses/${courseId}/get-faculties`,
                method: "GET",
            }),
            transformResponse: (
                response: TResponseRedux<{
                    faculties: TFaculty[];
                }>
            ) => {
                return {
                    data: response.data,
                };
            },
        }),
        getAllOfferedCourses: builder.query({
            query: () => ({
                url: "/offered-courses",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<any[]>) => {
                return {
                    data: response.data,
                    meta: response.data,
                };
            },
        }),
        addOfferCourse: builder.mutation({
            query: (data) => ({
                url: "/offered-courses/create-offered-course",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllRegisteredSemestersQuery,
    useAddRegisteredSemesterMutation,
    useUpdateRegisteredSemesterMutation,
    useGetAllCoursesQuery,
    useAddCourseMutation,
    useAddFacultiesMutation,
    useGetAllCourseFacultiesQuery,
    useGetAllOfferedCoursesQuery,
    useAddOfferCourseMutation,
} = courseManagementApi;
