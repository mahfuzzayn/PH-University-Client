import { TAcademicSemester } from "./academicManagement.type";

export type TSemester = {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
    createdAt: string;
    updatedAt: string;
};

export interface TCourse {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted: boolean;
    preRequisiteCourses: TPreRequisiteCourse2[];
}

export interface TPreRequisiteCourse2 {
    _id: string;
    course: string;
    isDeleted: boolean;
}
