/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import {
    useGetAllAcademicDepartmentsQuery,
    useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHInput from "../../../components/form/PHInput";
import {
    useAddOfferCourseMutation,
    useGetAllCourseFacultiesQuery,
    useGetAllCoursesQuery,
    useGetAllRegisteredSemestersQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { daysOptions } from "../../../constants/course";
import dayjs from "dayjs";
import { TResponse } from "../../../types";

const OfferCourse = () => {
    const [academicSemesterId, setAcademicSemesterId] = useState("");
    const [academicFacultyId, setAcademicFacultyId] = useState("");
    const [academicDepartmentId, setAcademicDepartmentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [facultyId, setFacultyId] = useState("");

    const { data: registeredSemestersData } =
        useGetAllRegisteredSemestersQuery(undefined);
    const { data: academicFacultiesData } =
        useGetAllAcademicFacultiesQuery(undefined);
    const { data: academicDepartmentsData } =
        useGetAllAcademicDepartmentsQuery(undefined);
    const { data: coursesData } = useGetAllCoursesQuery(undefined);
    const { data: facultyData } = useGetAllCourseFacultiesQuery(courseId, {
        skip: !courseId,
    });

    const [addOfferCourse] = useAddOfferCourseMutation();

    const semesterRegistrationOptions = registeredSemestersData?.data?.map(
        (item) => ({
            value: item._id,
            label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        })
    );

    const academicFacultiesOptions = academicFacultiesData?.data?.map(
        (item) => ({
            value: item._id,
            label: item.name,
        })
    );

    const academicDepartmentsOptions = academicDepartmentsData?.data
        ?.filter((item) => item.academicFaculty._id === academicFacultyId)
        .map((item) => ({ value: item._id, label: item.name }));

    const coursesOptions = coursesData?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const facultyOptions = facultyData?.data?.faculties.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");

        const offerCourseData = {
            ...data,
            section: Number(data.section),
            maxCapacity: Number(data.maxCapacity),
            startTime: dayjs(data.startTime).format("HH:mm"),
            endTime: dayjs(data.endTime).format("HH:mm"),
        };

        console.log(offerCourseData);

        try {
            const res = (await addOfferCourse(
                offerCourseData
            )) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Offer course created", { id: toastId });
            }
        } catch (err: any) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span="8">
                <PHForm onSubmit={onSubmit}>
                    <PHSelectWithWatch
                        onValueChange={setAcademicSemesterId}
                        name="semesterRegistration"
                        label="Academic Semester"
                        options={semesterRegistrationOptions}
                    />
                    <PHSelectWithWatch
                        onValueChange={setAcademicFacultyId}
                        name="academicFaculty"
                        label="Academic Faculty"
                        options={academicFacultiesOptions}
                        disabled={!academicSemesterId}
                    />
                    <PHSelectWithWatch
                        onValueChange={setAcademicDepartmentId}
                        name="academicDepartment"
                        label="Academic Department"
                        options={academicDepartmentsOptions}
                        disabled={!academicFacultyId}
                    />
                    <PHSelectWithWatch
                        onValueChange={setCourseId}
                        name="course"
                        label="Course"
                        options={coursesOptions}
                        disabled={!academicDepartmentId}
                    />
                    <PHSelectWithWatch
                        onValueChange={setFacultyId}
                        name="faculty"
                        label="Faculty"
                        options={facultyOptions}
                        disabled={!courseId}
                    />
                    <PHInput
                        type="text"
                        name="section"
                        label="Section"
                        disabled={!facultyId}
                    />
                    <PHInput
                        type="text"
                        name="maxCapacity"
                        label="Max Capacity"
                        disabled={!facultyId}
                    />
                    <PHSelect
                        mode="multiple"
                        name="days"
                        label="Days"
                        options={daysOptions}
                        disabled={!facultyId}
                    />
                    <PHTimePicker
                        name="startTime"
                        label="Start Time"
                        defaultValue={"10:00"}
                        disabled={!facultyId}
                    />
                    <PHTimePicker
                        name="endTime"
                        label="End Time"
                        defaultValue={"12:00"}
                        disabled={!facultyId}
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default OfferCourse;
