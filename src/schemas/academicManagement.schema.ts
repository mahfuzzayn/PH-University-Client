import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({
        required_error: "Please select a Name",
    }),
    year: z.string({
        required_error: "Please select a Year",
    }),
    startMonth: z.string({
        required_error: "Please select a Start Month",
    }),
    endMonth: z.string({
        required_error: "Please select a End Month",
    }),
});

export const academicFacultySchema = z.object({
    name: z.string({
        required_error: "Please input a Name",
    }),
});

export const academicDepartmentSchema = z.object({
    name: z.string({
        required_error: "Please input a Department",
    }),
    academicDepartment: z.string({
        required_error: "Please input a Faculty",
    }),
});
