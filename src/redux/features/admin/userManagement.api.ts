import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* STUDENT APIS */
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

        /* FACULTY APIS */
        getAllFaculties: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/faculties",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addFaculty: builder.mutation({
            query: (data) => ({
                url: "/users/create-faculty",
                method: "POST",
                body: data,
            }),
        }),
        getSingleFaculty: builder.query({
            query: (facultyId) => ({
                url: `/faculties/${facultyId}`,
                method: "GET",
            }),
        }),
        updateFaculty: builder.mutation({
            query: ({ facultyId, data }) => ({
                url: `/faculties/${facultyId}`,
                method: "PATCH",
                body: data,
            }),
        }),
        blockFaculty: builder.mutation({
            query: (facultyId) => ({
                url: `/users/change-status/${facultyId}`,
                method: "POST",
                body: {
                    status: "blocked",
                },
            }),
        }),

        /* ADMIN APIS */
        getAllAdmins: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/admins",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/users/create-admin",
                method: "POST",
                body: data,
            }),
        }),
        getSingleAdmin: builder.query({
            query: (adminId) => ({
                url: `/admins/${adminId}`,
                method: "GET",
            }),
        }),
        updateAdmin: builder.mutation({
            query: ({ adminId, data }) => ({
                url: `/admins/${adminId}`,
                method: "PATCH",
                body: data,
            }),
        }),
        blockAdmin: builder.mutation({
            query: (adminId) => ({
                url: `/users/change-status/${adminId}`,
                method: "POST",
                body: {
                    status: "blocked",
                },
            }),
        }),
    }),
});

export const {
    // Student
    useGetSingleStudentQuery,
    useGetAllStudentsQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useBlockStudentMutation,

    // Faculty
    useGetSingleFacultyQuery,
    useGetAllFacultiesQuery,
    useAddFacultyMutation,
    useUpdateAdminMutation,
    useBlockFacultyMutation,

    // Admin
    useGetSingleAdminQuery,
    useGetAllAdminsQuery,
    useAddAdminMutation,
    useUpdateFacultyMutation,
    useBlockAdminMutation,
} = userManagementApi;
