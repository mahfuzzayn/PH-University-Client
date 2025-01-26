import {
    TAcademicDepartment,
    TAcademicFaculty,
    TAcademicSemester,
} from "./academicManagement.type";

export interface TStudent {
    _id: string;
    id: string;
    user: TUser;
    name: TName;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg: string;
    admissionSemester: TAcademicSemester;
    academicDepartment: TAcademicDepartment;
    academicFaculty: TAcademicFaculty;
    isDeleted: boolean;
    fullName: string;
}

export interface TFaculty {
    _id: string;
    id: string;
    user: TUser;
    name: TName;
    designation: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: string;
    presentAddress: string;
    permanentAddress: string;
    academicDepartment: string;
    isDeleted: boolean;
    fullName: string;
}

export interface TAdmin {
    _id: string;
    id: string;
    user: TUser;
    name: TName;
    designation: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: string;
    presentAddress: string;
    permanentAddress: string;
    managementDepartment: string;
    isDeleted: boolean;
    fullName: string;
}

export interface TUser {
    _id: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TName {
    firstName: string;
    lastName: string;
    _id: string;
}

export interface TGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    _id: string;
}

export interface TLocalGuardian {
    name: string;
    occupation: string;
    address: string;
    contactNo: string;
    _id: string;
}
