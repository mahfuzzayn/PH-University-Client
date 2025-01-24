export interface TAcademicSemester {
    _id: string;
    name: string;
    year: string;
    code: string;
    startMonth: string;
    endMonth: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TAcademicFaculty {
    _id: string;
    name: string;
    __v: number;
}

export interface TAcademicDepartment {
    _id: string;
    name: string;
    academicFaculty: TAcademicFaculty
    __v: number;
}
